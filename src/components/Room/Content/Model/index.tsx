import { useGLTF } from "@react-three/drei";
import { FC, useRef, useMemo, useEffect } from "react";
import { ModelProps } from "./Model.props";

// Предварительно загружаем модель логотипа
useGLTF.preload("./Model/model.glb");

// Компонент для загрузки и отображения GLB логотипа
const Model: FC<ModelProps> = ({
  position = [2.65, 0.98, 8.25],
  rotation = [0, Math.PI / 2, 0],
  id = "Model",
}) => {
  const ModelRef = useRef<any>(null);

  // Загружаем GLB модель логотипа с уникальным ключом кэширования для каждого экземпляра
  const { scene } = useGLTF("./Model/model.glb", true);

  // Клонируем модель для предотвращения конфликтов при использовании нескольких экземпляров
  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  useEffect(() => {
    if (ModelRef.current && clonedScene) {
      console.log(`GLB логотип ${id} успешно загружен`);

      // Обработка материалов и теней для логотипа
      clonedScene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Назначаем уникальный ID для предотвращения конфликтов
          child.name = `${child.name || "mesh"}_${id}`;
        }
      });
    }
  }, [clonedScene, id]);

  return (
    <group ref={ModelRef} position={position} rotation={rotation}>
      <primitive object={clonedScene} scale={[0.0012, 0.0012, 0.0012]} />
    </group>
  );
};

export default Model;
