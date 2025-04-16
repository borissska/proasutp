import { useGLTF } from "@react-three/drei";
import { FC, useRef, useMemo } from "react";
import { BoxProps } from "./Box.props";

// Предварительно загружаем модель логотипа
useGLTF.preload("./Box/model.glb");

// Базовый компонент без эффектов
const BaseBox: FC<Omit<BoxProps, "handleObjectHover">> = ({
  position,
  rotation,
  name,
}) => {
  const boxRef = useRef<any>(null);

  // Загружаем GLB модель логотипа с уникальным ключом кэширования для каждого экземпляра
  const { scene } = useGLTF("./Box/model.glb", true);

  // Клонируем модель для предотвращения конфликтов при использовании нескольких экземпляров
  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  clonedScene.traverse((child: any) => {
    if (child.isMesh) {
      // Назначаем уникальный ID для предотвращения конфликтов
      child.name = `${child.name || "mesh"}_${name}`;
    }
  });

  return (
    <group position={position} rotation={rotation} ref={boxRef}>
      <primitive object={clonedScene} scale={[0.5, 0.5, 0.5]} />
    </group>
  );
};

export default BaseBox;
