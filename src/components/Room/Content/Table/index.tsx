import { useGLTF } from "@react-three/drei";
import { FC, useRef, useMemo, useEffect } from "react";
import { TableProps } from "./Table.props";

// Предварительно загружаем модель логотипа
useGLTF.preload("./Table/model.glb");

// Компонент для загрузки и отображения GLB логотипа
const Table: FC<TableProps> = ({ position = [2.2, 0, 7], rotation = [0, Math.PI / 2, 0], id = "table" }) => {
  const tableRef = useRef<any>(null);

  // Загружаем GLB модель логотипа с уникальным ключом кэширования для каждого экземпляра
  const { scene } = useGLTF("./Table/model.glb", true);

  // Клонируем модель для предотвращения конфликтов при использовании нескольких экземпляров
  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  useEffect(() => {
    if (tableRef.current && clonedScene) {
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
    <group ref={tableRef} position={position} rotation={rotation}>
      <primitive object={clonedScene} scale={[0.47, 0.4, 0.5]} />
    </group>
  );
};

export default Table;
