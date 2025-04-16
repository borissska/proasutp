import { useGLTF } from "@react-three/drei";
import { FC, useRef, useMemo, useEffect } from "react";
import { LogoProps } from "./Logo.props";

// Предварительно загружаем модель логотипа
useGLTF.preload("./Room/Logo.glb");

// Компонент для загрузки и отображения GLB логотипа
const Logo: FC<LogoProps> = ({ position = [0, 1.8, 0], rotation = [0, 0, 0], id = "logo" }) => {
  const logoRef = useRef<any>(null);

  // Загружаем GLB модель логотипа с уникальным ключом кэширования для каждого экземпляра
  const { scene } = useGLTF("./Room/Logo.glb", true);

  // Клонируем модель для предотвращения конфликтов при использовании нескольких экземпляров
  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  useEffect(() => {
    if (logoRef.current && clonedScene) {
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
    <group ref={logoRef} position={position} rotation={rotation}>
      <primitive object={clonedScene} scale={[3, 3, 3]} />
    </group>
  );
};

export default Logo;
