import { useGLTF } from "@react-three/drei";
import { FC, useRef, useMemo, useEffect } from "react";
import { ElectricityBoxProps } from "./ElectricityBox.props";

// Предварительно загружаем модель логотипа
useGLTF.preload("./ElectricityBox/model.glb");

// Компонент для загрузки и отображения GLB логотипа
const ElectricityBox: FC<ElectricityBoxProps> = ({
  position = [-3.4, 0, -1.65],
  rotation = [0, Math.PI / 2, 0],
  id = "ElectricityBox",
}) => {
  const ElectricityBoxRef = useRef<any>(null);

  // Загружаем GLB модель логотипа с уникальным ключом кэширования для каждого экземпляра
  const { scene } = useGLTF("./ElectricityBox/model.glb", true);

  // Клонируем модель для предотвращения конфликтов при использовании нескольких экземпляров
  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  useEffect(() => {
    if (ElectricityBoxRef.current && clonedScene) {
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
    <group ref={ElectricityBoxRef} position={position} rotation={rotation}>
      <primitive object={clonedScene} scale={[1.6, 1.6, 1.6]} />
    </group>
  );
};

export default ElectricityBox;
