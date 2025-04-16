import { Vector3 } from "three";
import DistantStars from "./Stars";
import Sun from "./Sun";
import Moon from "./Moon";
import Earth from "./Earth";
import { FC, useEffect } from "react";
import Space from "./Space";
import { useThree } from "@react-three/fiber";
import { Color, CubeTextureLoader } from "three";

/**
 * Основной компонент космического окружения
 * Объединяет солнце, планеты и звезды
 */
const Environment: FC = () => {
  const { scene } = useThree();

  // Эффект для настройки окружения при монтировании компонента
  useEffect(() => {
    if (!scene) return;

    console.log("Initializing Environment");

    // Устанавливаем базовый цвет фона сцены
    scene.background = new Color("#000000");

    // Попробуем загрузить cubemap для космического окружения
    try {
      const cubeLoader = new CubeTextureLoader();

      // Для отладки загрузки
      console.log("Loading skybox textures...");

      // Массив текстур для cubemap с пометкой для CORS
      const urls = [
        "/skybox/right.jpg",
        "/skybox/left.jpg",
        "/skybox/top.jpg",
        "/skybox/bottom.jpg",
        "/skybox/front.jpg",
        "/skybox/back.jpg",
      ];

      // Создаем текстурный загрузчик с обработкой ошибок
      cubeLoader.setCrossOrigin("anonymous");
      cubeLoader.load(
        urls,
        (textureCube) => {
          console.log("Skybox loaded successfully!");
          scene.background = textureCube;
        },
        (progress) => {
          console.log(`Loading skybox: ${Math.round((progress.loaded / progress.total) * 100)}%`);
        },
        (error) => {
          console.error("Error loading skybox:", error);
          // Используем резервный цвет фона в случае ошибки
          scene.background = new Color("#000033");
        }
      );
    } catch (e) {
      console.error("Failed to load skybox:", e);
      scene.background = new Color("#000033");
    }

    // Установим базовый цвет тумана
    scene.fog = null; // Отключаем туман для космоса

    return () => {
      // Очистка при размонтировании компонента
      scene.background = new Color("#000000");
      scene.fog = null;
    };
  }, [scene]);

  // Позиция солнца вдалеке
  const sunPosition = new Vector3(500, 100, -500);

  // Позиции планет - изменена позиция Земли
  const earthPosition = new Vector3(100, 0, 50);

  return (
    <group>
      <Space color='#010a20' />

      {/* Далекие звезды по всей космической сфере */}
      <DistantStars count={7000} />

      {/* Солнце с улучшенными эффектами */}
      <Sun position={sunPosition} radius={15} />

      {/* Планеты с быстрым вращением */}
      <Earth position={earthPosition} radius={9} rotationSpeed={0.0008} />

      {/* Луна, вращающаяся вокруг Земли */}
      <Moon
        centerPosition={earthPosition}
        orbitRadius={30}
        radius={10}
        rotationSpeed={0.0015}
        orbitSpeed={0.001}
      />
    </group>
  );
};

export default Environment;
