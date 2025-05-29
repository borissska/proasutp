import { FC, useCallback } from "react";
import { DistributionBoxProps } from "./DistributionBox.props";
import { Vector3, Object3D } from "three";
import BaseDistributionBox from "./BaseDistibutionBox";
import createInteractiveModel from "../HOC/createNewInteractiveModel";

// Создаем HOC с нашим базовым компонентом один раз
const InteractiveDistributionBox = createInteractiveModel(BaseDistributionBox);

/**
 * Компонент распределительного щита с эффектами интерактивности
 */
const DistributionBox: FC<DistributionBoxProps> = (props) => {
  const { position, rotation, scale = 1, handleObjectClick, handleObjectHover, name } = props;

  // Функция для обработки клика на объект
  const handleClick = useCallback(() => {
    if (handleObjectClick) {
      const infoPosition = new Vector3(position[0], position[1] + 2.55, position[2] - 0.8);
      handleObjectClick(
        "Распределительный щит",
        "Контролирует подачу энергии и защищает от перегрузок",
        infoPosition,
        300
      );
    }
  }, [handleObjectClick, position]);

  // Функция для обработки наведения на объект
  const handleHover = useCallback(
    (object: Object3D | null) => {
      if (handleObjectHover) {
        handleObjectHover(!!object);
      }
    },
    [handleObjectHover]
  );

  return (
    <InteractiveDistributionBox
      position={position}
      rotation={rotation}
      scale={scale}
      name={name}
      onClick={handleClick}
      onHover={handleHover}
    />
  );
};

export default DistributionBox;
