import { Suspense, FC, useEffect, useRef, useState } from "react";
import RoomModel from "./RoomModel";
import RoomFallback from "./RoomFallback";
import ErrorBoundary from "./RoomError";
import Logo from "./Logo";
import { PointerLockControls, PerspectiveCamera } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import React from "react";
import { Vector3, Mesh, MeshStandardMaterial, Group } from "three";
import ControlPanel from "./ControlPanel";
import AlarmLight from "./AlarmLight";
import InfoCard from "./InfoCard";
import { InfoCardState } from "./Content.props";
import Environment from "../../Environment";
import DistributionBox from "./DistributionBox";
import Table from "./Table";
import Box from "./Box";
import Model from "./Model";
import ElectricityBox from "./ElecticityBox";

// Основной компонент
const RoomSpace: FC = () => {
  // Состояние для управления перемещением
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Получение камеры из контекста three.js
  const { camera } = useThree();

  // Ссылка на контроллер перемещения
  const controlsRef = useRef<any>(null);

  // Состояние для информационной карточки
  const [infoCard, setInfoCard] = useState<InfoCardState>({
    visible: false,
    title: "",
    description: "",
    position: new Vector3(),
  });

  const sceneRef = useRef<Group | null>(null);

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

  // Обработчик клика по объекту
  const handleObjectClick = (title: string, description: string, position: Vector3) => {
    setInfoCard({
      visible: true,
      title,
      description,
      position,
    });
  };

  // Обработчик наведения на объекты
  const handleObjectHover = (title: string) => {
    if (!sceneRef.current) return;

    const hoveredObject = sceneRef.current.getObjectByName(title);

    if (hoveredObject instanceof Mesh) {
      // Сохраняем оригинальный материал
      const originalMaterial = hoveredObject.material;

      // Создаем новый материал с подсветкой
      const highlightMaterial = new MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 0.5,
      });

      // Применяем подсветку
      hoveredObject.material = highlightMaterial;

      // Возвращаем оригинальный материал при уходе курсора
      const handlePointerLeave = () => {
        hoveredObject.material = originalMaterial;
        hoveredObject.removeEventListener("pointerleave", handlePointerLeave);
      };

      hoveredObject.addEventListener("pointerleave", handlePointerLeave);
    }
  };

  return (
    <group position={[0, 0, 0]}>
      <ErrorBoundary>
        <Suspense fallback={<RoomFallback />}>
          {/* Камера с системой управления */}
          <PerspectiveCamera makeDefault />
          <PointerLockControls ref={controlsRef} />


          {/* <ControlPanel 
          position={[-3.5, 1.3, 9.6]} 
          rotation={[0, Math.PI / 2, 0]} 
          handleObjectClick={handleObjectClick} 
        /> */}

          <DistributionBox
            position={[-3.2, -1, 10]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={0.02}
            handleObjectClick={handleObjectClick}
            handleObjectHover={handleObjectHover}
          />

          {/* Информационная карточка */}
          {infoCard.visible && (
            <InfoCard
              title={infoCard.title}
              description={infoCard.description}
              position={infoCard.position}
              visible={true}
            />
          )}

          <Table />
          <Model />
          <ElectricityBox />
          <Box
            position={[2.5, 0.19, 4.7]}
            rotation={[0, 0, 0]}
            handleObjectClick={handleObjectClick}
            name='box'
          />

          {/* Добавление космического окружения вне комнаты */}
          <Environment />

          {/* Потолочные светильники вдоль коридора */}
          {[-11, 0, 10.5].map((z) => (
            <React.Fragment key={z}>
              {/* Светильники на левой стене */}
              <AlarmLight position={[-3.4, 2, z]} rotation={[0, Math.PI / 2, 0]} />
            </React.Fragment>
          ))}

          {/* Комната и её содержимое */}
          <group
            position={[0, 0, 0]}
            onClick={() => {
              // Закрываем информационную карточку при клике на пустое пространство
              setInfoCard((prev) => ({ ...prev, visible: false }));
            }}
            ref={sceneRef}
          >
            <RoomModel />

            {/* Размещаем логотип в комнате в нескольких местах */}
            <Logo position={[0, 2.15, -13.37]} rotation={[0, 0, 0]} />
            <Logo position={[0, 2.15, 13.37]} rotation={[0, Math.PI, 0]} />
          </group>
        </Suspense>
      </ErrorBoundary>
    </group>
  );
};

export default RoomSpace;
