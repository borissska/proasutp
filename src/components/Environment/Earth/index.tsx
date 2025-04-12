import { useLoader, useFrame } from "@react-three/fiber";
import { FC, useRef, useEffect } from "react";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { EarthProps } from "./Earth.props";

/**
 * Компонент планеты
 * Создает вращающуюся планету используя OBJ модель
 */
const Earth: FC<EarthProps> = ({ position, radius, rotationSpeed = 0.001 }) => {
  const groupRef = useRef<any>(null);

  // Загрузка материалов и модели
  const materials = useLoader(MTLLoader, "/Earth/Earth.mtl");
  const obj = useLoader(OBJLoader, "/Earth/Earth.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // Настройка начальной позиции и поворота модели
  useEffect(() => {
    if (groupRef.current && obj) {
      // Указываем позицию группы в соответствии с переданными параметрами
      groupRef.current.position.copy(position);

      // Установка начального поворота модели
      obj.rotation.set(0, 0, 0);

      // Центрирование модели в пространстве группы
      obj.position.set(0, 0, 0);

      // Масштабирование модели (исходя из её реальных размеров ~700 единиц)
      const scaleFactor = radius / 700; // 700 - примерный размер модели
      groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  }, [obj, position, radius]);

  // Медленное вращение планеты
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={obj} />
    </group>
  );
};

export default Earth;
