import { useGLTF } from "@react-three/drei";
import { FC, useRef, useMemo, useEffect, forwardRef } from "react";
import { BoxProps } from "./Box.props";
import { Mesh, Group } from "three";

// Предварительно загружаем модель логотипа
useGLTF.preload("./Box/model.glb");

// Базовый компонент без эффектов
const BaseBox = forwardRef<Group, Omit<BoxProps, "handleObjectHover">>(
  ({ position, rotation, name }, ref) => {
    const localRef = useRef<Group>(null);
    const boxRef = ref || localRef;

    // Загружаем GLB модель логотипа
    const { scene } = useGLTF("./Box/model.glb", true);

    // Клонируем модель для предотвращения конфликтов
    const clonedScene = useMemo(() => {
      const cloned = scene.clone(true);
      cloned.scale.set(0.6, 0.6, 0.6);
      return cloned;
    }, [scene]);

    useEffect(() => {
      if (boxRef && "current" in boxRef && boxRef.current && clonedScene) {
        console.log(`GLB коробка ${name} успешно загружена`);

        // Обработка материалов и теней для модели
        clonedScene.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.name = `${child.name || "mesh"}_${name}`;
            child.userData.__interactive = true;
          }
        });

        // Добавляем клонированную сцену
        boxRef.current.add(clonedScene);
      }
    }, [clonedScene, name, boxRef]);

    return <group ref={boxRef} position={position} rotation={rotation} name={name} />;
  }
);

BaseBox.displayName = "BaseBox";

export default BaseBox;
