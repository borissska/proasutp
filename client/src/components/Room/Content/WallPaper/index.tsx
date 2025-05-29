import { FC, useCallback } from "react";
import { WallPaperProps } from "./WallPaper.props";
import { Vector3 } from "three";
import BaseWallpaper from "./BaseWallpaper";
import createInteractiveModel from "../HOC/createNewInteractiveModel";

// Создаем HOC с нашим базовым компонентом один раз
const InteractiveWallpaper = createInteractiveModel(BaseWallpaper);

/**
 * Компонент Wallpaper с эффектами интерактивности
 */
const WallPaper: FC<WallPaperProps> = (props) => {
  const { position, rotation, handleObjectClick, handleObjectHover, name } = props;

  // Функция для обработки клика на объект
  const handleClick = useCallback(() => {
    if (handleObjectClick) {
      const infoPosition = new Vector3(position[0], position[1] + 4, position[2] - 4.4);
      handleObjectClick("Обои", `Современные обои для вашего интерьера`, infoPosition, 280);
    }
  }, [handleObjectClick, position]);

  // Функция для обработки наведения на объект
  const handleHover = useCallback(
    (object: any) => {
      if (handleObjectHover) {
        handleObjectHover(!!object);
      }
    },
    [handleObjectHover]
  );

  return (
    <InteractiveWallpaper
      position={position}
      rotation={rotation}
      name={name}
      onClick={handleClick}
      onHover={handleHover}
    />
  );
};

export default WallPaper;
