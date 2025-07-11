import { FC, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Color } from "three";
import { Stars } from "./stars/stars";
import { Space } from "./space/space";
import { Earth } from "./earth/earth";
import { Moon } from "./moon/moon";
import Sun from "./sun/sun";
import { ENVIRONMENT_CONFIG } from "../model/constants";

/**
 * Компонент окружения
 * Включает в себя все элементы окружения: звезды, космос, землю, луну и солнце
 */
const Environment: FC = () => {
  const { scene } = useThree();

  // Эффект для настройки окружения при монтировании компонента
  useEffect(() => {
    // Устанавливаем цвет фона
    scene.background = new Color(ENVIRONMENT_CONFIG.SPACE_COLOR);

    // Отключаем туман
    scene.fog = null;

    return () => {
      // Очистка при размонтировании компонента
      scene.background = new Color(ENVIRONMENT_CONFIG.BACKGROUND_COLOR);
      scene.fog = null;
    };
  }, [scene]);

  // Позиции объектов
  return (
    <>
      <Stars />
      <Space />
      <Earth/>
      <Moon />
      <Sun />
    </>
  );
};

export { Environment };
