import { useGLTF, Text } from "@react-three/drei";
import { FC, useRef, useMemo, useEffect, useState } from "react";
import { LogoProps } from "./Logo.props";

// Предварительно загружаем модель логотипа
useGLTF.preload("./Room/logo.glb");

// Компонент для загрузки и отображения GLB логотипа
const Logo: FC<LogoProps> = ({ position = [0, 1.8, 0], rotation = [0, 0, 0], id = "logo" }) => {
  const logoRef = useRef<any>(null);
  const [loadError, setLoadError] = useState(false);

  // Загружаем GLB модель логотипа с обработкой ошибок
  const modelPath = "./Room/logo.glb";

  // Всегда вызываем хук useGLTF - это соответствует правилам React Hooks
  const { scene } = useGLTF(modelPath, true);

  // Регистрируем ошибки в useEffect
  useEffect(() => {
    if (!scene) {
      console.error(`Ошибка загрузки модели ${modelPath}: сцена не доступна`);
      setLoadError(true);
    }
  }, [scene, modelPath]);

  // Клонируем модель для предотвращения конфликтов при использовании нескольких экземпляров
  const clonedScene = useMemo(() => {
    if (!scene) return null;
    try {
      return scene.clone(true);
    } catch (error) {
      console.error(`Ошибка клонирования модели ${modelPath}:`, error);
      setLoadError(true);
      return null;
    }
  }, [scene, modelPath]);

  useEffect(() => {
    if (loadError) {
      console.error(`Не удалось загрузить модель логотипа ${id}`);
      return;
    }

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
  }, [clonedScene, id, loadError]);

  // Если была ошибка загрузки, отображаем простую замену
  if (loadError) {
    return (
      <group position={position} rotation={rotation}>
        <mesh>
          <boxGeometry args={[2, 1, 0.2]} />
          <meshStandardMaterial color='#ec1e27' />
        </mesh>
        <Text position={[0, 0, 0.15]} fontSize={0.5} color='#ffffff'>
          LOGO
        </Text>
      </group>
    );
  }

  return (
    <group ref={logoRef} position={position} rotation={rotation}>
      {clonedScene && <primitive object={clonedScene} scale={[3, 3, 3]} />}
    </group>
  );
};

export default Logo;
