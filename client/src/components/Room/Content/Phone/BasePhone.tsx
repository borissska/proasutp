import { useGLTF } from "@react-three/drei";
import { FC, useRef, useMemo, useEffect } from "react";
import { PhoneProps } from "./Phone.props";
import { Mesh, Group, Raycaster, Intersection } from "three";

// Предварительно загружаем модель логотипа
useGLTF.preload("./Phone/model.glb");

// Компонент для загрузки и отображения GLB логотипа
const Phone: FC<PhoneProps> = ({
  position = [-3.31, 2, -12],
  rotation = [0, Math.PI / 2, 0],
  name = "Phone",
}) => {
  const phoneRef = useRef<Group>(null);

  // Загружаем GLB модель логотипа с уникальным ключом кэширования для каждого экземпляра
  const { scene } = useGLTF("./Phone/model.glb", true);

  // Клонируем модель для предотвращения конфликтов при использовании нескольких экземпляров
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);
    // Уменьшаем размер модели
    cloned.scale.set(0.4, 0.4, 0.4);
    return cloned;
  }, [scene]);

  useEffect(() => {
    if (phoneRef.current && clonedScene) {
      console.log(`GLB телефон ${name} успешно загружен`);

      // Обработка материалов и теней для модели
      clonedScene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Назначаем уникальный ID для предотвращения конфликтов
          child.name = `${child.name || "mesh"}_${name}`;

          // Убеждаемся, что raycast работает корректно
          const originalRaycast = child.raycast;
          child.raycast = function (raycaster: Raycaster, intersects: Intersection[]) {
            originalRaycast.call(this, raycaster, intersects);
          };

          // Помечаем как интерактивный элемент
          child.userData.__interactive = true;
        }
      });

      // Добавляем коллайдер на весь объект для лучшего обнаружения событий
      const containerMesh = new Mesh();
      containerMesh.visible = false; // Скрываем визуально
      containerMesh.scale.set(0.08, 0.08, 0.08); // Размер коллайдера под новый масштаб модели
      containerMesh.userData.__interactive = true;
      phoneRef.current.add(containerMesh);

      // Применяем клонированную сцену
      phoneRef.current.add(clonedScene);
    }
  }, [clonedScene, name]);

  return <group ref={phoneRef} position={position} rotation={rotation} />;
};

export default Phone;
