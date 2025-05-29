import { useGLTF } from "@react-three/drei";
import { FC, useRef, useMemo, useEffect, forwardRef } from "react";
import { Mesh, Group } from "three";
import { ModelProps } from "./Model.props";

// Предварительно загружаем модель
useGLTF.preload("./Model/model.glb");

const BaseModel = forwardRef<Group, Omit<ModelProps, "handleObjectHover" | "handleObjectClick">>(
  ({ position = [2.65, 0.98, 8.25], rotation = [0, Math.PI / 2, 0], name = "Model" }, ref) => {
    const localRef = useRef<Group>(null);
    const modelRef = ref || localRef;

    // Загружаем GLB модель
    const { scene } = useGLTF("./Model/model.glb", true);

    // Клонируем модель для предотвращения конфликтов
    const clonedScene = useMemo(() => {
      const cloned = scene.clone(true);
      cloned.scale.set(0.0012, 0.0012, 0.0012);
      return cloned;
    }, [scene]);

    useEffect(() => {
      if (modelRef && "current" in modelRef && modelRef.current && clonedScene) {
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
        modelRef.current.add(clonedScene);
      }
    }, [clonedScene, name, modelRef]);

    return <group ref={modelRef} position={position} rotation={rotation} name={name} />;
  }
);

BaseModel.displayName = "BaseModel";

export default BaseModel;
