import { Vector3 } from "three";
import DistantStars from "./Stars";
import Sun from "./Sun";
import Moon from "./Moon";
import Earth from "./Earth";
import { FC, useEffect } from "react";
import Space from "./Space";
import { useThree } from "@react-three/fiber";
import { Color } from "three";

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

    // Устанавливаем простой цвет фона
    scene.background = new Color("#000033"); // Тёмно-синий цвет для космоса

    // Отключаем туман
    scene.fog = null;

    return () => {
      // Очистка при размонтировании компонента
      scene.background = new Color("#000000");
      scene.fog = null;
    };
  }, [scene]);

  // Позиция солнца вдалеке
  const sunPosition = new Vector3(500, 100, -500);

  // Позиции планет - изменена позиция Земли
  const earthPosition = new Vector3(120, 0, 50);

  return (
    <group>
      <Space color='#010a20' />

      {/* Далекие звезды по всей космической сфере */}
      <DistantStars count={7000} />

      {/* Солнце с улучшенными эффектами */}
      <Sun position={sunPosition} radius={15} />

      {/* Планеты с быстрым вращением */}
      <Earth position={earthPosition} radius={5} rotationSpeed={0.0008} />

      {/* Луна, вращающаяся вокруг Земли */}
      <Moon
        centerPosition={earthPosition}
        orbitRadius={20}
        radius={10}
        rotationSpeed={0.0015}
        orbitSpeed={0.001}
      />
    </group>
  );
};

export default Environment;
