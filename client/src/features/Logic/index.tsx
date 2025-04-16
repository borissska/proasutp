import { Suspense, FC, useEffect, useRef, useState } from "react";
import { PointerLockControls, PerspectiveCamera } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import ErrorBoundary from "../../components/Room/Content/RoomError";
import RoomFallback from "../../components/Room/Content/RoomFallback";
import Room from "../../components/Room";
import Environment from "../../components/Environment";

// Основной компонент
const Logic: FC = () => {
  // Состояние для управления перемещением
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Получение камеры и других объектов из контекста three.js
  const { camera, gl, scene } = useThree();

  // Проверяем инициализацию WebGL
  useEffect(() => {
    console.log("WebGL Initialization Status:");
    console.log("Renderer:", gl);
    console.log("Scene:", scene);
    console.log("Camera:", camera);

    // Debug renderer capabilities
    if (gl) {
      console.log("WebGL Context:", gl.getContext());
      console.log("WebGL Info:", {
        version: gl.getContext().getParameter(gl.getContext().VERSION),
        vendor: gl.getContext().getParameter(gl.getContext().VENDOR),
        renderer: gl.getContext().getParameter(gl.getContext().RENDERER),
        shadingLanguageVersion: gl
          .getContext()
          .getParameter(gl.getContext().SHADING_LANGUAGE_VERSION),
        extensions: gl.getContext().getSupportedExtensions(),
      });
    }
  }, [gl, scene, camera]);

  // Ссылка на контроллер перемещения
  const controlsRef = useRef<any>(null);

  // Установка начальной позиции камеры и передача её родительскому компоненту
  useEffect(() => {
    if (!camera) return;

    console.log("Инициализация камеры");

    // Загружаем сохраненную позицию из localStorage, если она есть
    const savedPosition = localStorage.getItem("playerPosition");
    const savedRotation = localStorage.getItem("playerRotation");

    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition);

        // Проверяем, что позиция валидна и находится в пределах комнаты
        const isValid =
          position &&
          typeof position.x === "number" &&
          typeof position.y === "number" &&
          typeof position.z === "number" &&
          position.x >= -3.2 &&
          position.x <= 3.2 &&
          position.y >= -0.3 &&
          position.y <= 7.5 &&
          position.z >= -13.5 &&
          position.z <= 13.5;

        if (isValid) {
          camera.position.set(position.x, position.y, position.z);
          console.log("Загружена сохраненная позиция:", position);
        } else {
          console.warn(
            "Сохраненная позиция находится вне допустимых границ, используем позицию по умолчанию"
          );
          camera.position.set(0, 1.7, 12);
        }
      } catch (e) {
        console.error("Ошибка при загрузке позиции:", e);
        camera.position.set(0, 1.7, 12);
      }
    } else {
      console.log("Нет сохраненной позиции, устанавливаем стартовую");
      camera.position.set(0, 1.7, 12);
    }

    // Загружаем сохраненный поворот камеры
    if (savedRotation) {
      try {
        const rotation = JSON.parse(savedRotation);
        if (
          rotation &&
          typeof rotation.x === "number" &&
          typeof rotation.y === "number" &&
          typeof rotation.z === "number"
        ) {
          camera.rotation.set(rotation.x, rotation.y, rotation.z);
          console.log("Загружен сохраненный поворот камеры:", rotation);
        }
      } catch (e) {
        console.error("Ошибка при загрузке поворота камеры:", e);
      }
    }

    // Функция для сохранения позиции и поворота при выходе
    const savePositionAndRotation = () => {
      if (camera) {
        const position = {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
        };
        const rotation = {
          x: camera.rotation.x,
          y: camera.rotation.y,
          z: camera.rotation.z,
        };
        localStorage.setItem("playerPosition", JSON.stringify(position));
        localStorage.setItem("playerRotation", JSON.stringify(rotation));
        console.log("Позиция и поворот сохранены:", { position, rotation });
      }
    };

    // Добавляем обработчик beforeunload
    window.addEventListener("beforeunload", savePositionAndRotation);

    return () => {
      window.removeEventListener("beforeunload", savePositionAndRotation);
    };
  }, [camera]);

  // Добавление обработчиков клавиш
  useEffect(() => {
    // Добавляем обработчики клавиш для ручного управления перемещением
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          setMovement((prev) => ({ ...prev, forward: true }));
          break;
        case "KeyS":
          setMovement((prev) => ({ ...prev, backward: true }));
          break;
        case "KeyA":
          setMovement((prev) => ({ ...prev, left: true }));
          break;
        case "KeyD":
          setMovement((prev) => ({ ...prev, right: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          setMovement((prev) => ({ ...prev, forward: false }));
          break;
        case "KeyS":
          setMovement((prev) => ({ ...prev, backward: false }));
          break;
        case "KeyA":
          setMovement((prev) => ({ ...prev, left: false }));
          break;
        case "KeyD":
          setMovement((prev) => ({ ...prev, right: false }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [camera]);

  // Логика передвижения камеры с обнаружением столкновений
  useFrame(() => {
    const speed = 0.15; // Немного уменьшил скорость для плавности
    const playerHeight = 1.7; // Высота камеры (персонажа)
    const playerRadius = 0.5; // Радиус коллизии игрока

    // Границы комнаты с учетом толщины игрока
    const roomBounds = {
      minX: -3.2 + playerRadius,
      maxX: 3.2 - playerRadius,
      minZ: -13.5 + playerRadius,
      maxZ: 13.5 - playerRadius,
      minY: -2 + playerHeight,
      maxY: 8 - 0.5, // Верхняя граница с запасом
    };

    // Логирование текущей позиции для отладки (раз в секунду)
    if (Math.random() < 0.01) {
      // ~1% вероятность в каждом кадре
      console.log("Текущая позиция:", {
        x: camera.position.x.toFixed(2),
        y: camera.position.y.toFixed(2),
        z: camera.position.z.toFixed(2),
      });
    }

    // Создаем вектор направления движения
    const frontVector = new Vector3();
    const sideVector = new Vector3();

    // Определяем направление движения на основе нажатых клавиш
    if (movement.forward) frontVector.z = 1;
    if (movement.backward) frontVector.z = -1;
    if (movement.left) sideVector.x = -1;
    if (movement.right) sideVector.x = 1;

    // Применяем движение только если есть ввод от пользователя
    if (frontVector.length() > 0 || sideVector.length() > 0) {
      // Получаем направление камеры
      const cameraDirection = new Vector3();
      camera.getWorldDirection(cameraDirection);

      // Обнуляем вертикальную составляющую для горизонтального перемещения
      cameraDirection.y = 0;
      cameraDirection.normalize();

      // Создаем вектор вправо от направления камеры
      const cameraRight = new Vector3(-cameraDirection.z, 0, cameraDirection.x);

      // Вектор желаемого перемещения
      const moveVector = new Vector3();

      // Добавляем компоненты движения
      if (frontVector.z !== 0) {
        moveVector.addScaledVector(cameraDirection, frontVector.z);
      }

      if (sideVector.x !== 0) {
        moveVector.addScaledVector(cameraRight, sideVector.x);
      }

      // Нормализуем и применяем скорость
      if (moveVector.length() > 0) {
        moveVector.normalize().multiplyScalar(speed);

        // Рассчитываем новую позицию
        const newPosition = camera.position.clone().add(moveVector);

        // Проверяем коллизии по отдельным осям вместо проверки всего вектора
        // Это позволяет "скользить" вдоль стен

        // Сначала проверяем X координату
        if (newPosition.x < roomBounds.minX) {
          newPosition.x = roomBounds.minX;
        } else if (newPosition.x > roomBounds.maxX) {
          newPosition.x = roomBounds.maxX;
        }

        // Затем проверяем Z координату
        if (newPosition.z < roomBounds.minZ) {
          newPosition.z = roomBounds.minZ;
        } else if (newPosition.z > roomBounds.maxZ) {
          newPosition.z = roomBounds.maxZ;
        }

        // Обновляем позицию по каждой оси отдельно
        camera.position.x = newPosition.x;
        camera.position.z = newPosition.z;

        // Проверка коллизии с полом и потолком (обычно не нужна для WASD)
        if (newPosition.y < roomBounds.minY) {
          camera.position.y = roomBounds.minY;
        } else if (newPosition.y > roomBounds.maxY) {
          camera.position.y = roomBounds.maxY;
        }
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <ErrorBoundary>
        <Suspense fallback={<RoomFallback />}>
          {/* Камера с системой управления */}
          <PerspectiveCamera makeDefault />
          <PointerLockControls ref={controlsRef} />

          <Environment />
          <Room />
        </Suspense>
      </ErrorBoundary>
    </group>
  );
};

export default Logic;
