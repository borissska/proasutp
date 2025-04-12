import { FC } from "react";
import { DistributionBoxProps } from "./DistributionBox.props";
import { Vector3 } from "three";
import BaseDistributionBox from "./BaseDistibutionBox";
import withHoverEffect from "../HOC/withHoverEffect";
import { WithHoverEffectProps } from "../HOC/withHoverEffect.props";

/**
 * Компонент распределительного щита с эффектами наведения и клика
 */
const DistributionBox: FC<DistributionBoxProps & WithHoverEffectProps> = (props) => {
  const { position, rotation, scale, handleObjectClick, handleObjectHover, ...restProps } = props;

  // Создаем HOC с нашим базовым компонентом
  const DistributionBoxWithHoverEffect = withHoverEffect(BaseDistributionBox);

  // Функция для обработки клика на объект
  const handleClick = () => {
    if (handleObjectClick) {
      const infoPosition = new Vector3(position[0], position[1] + 2.55, position[2] - 0.8);

      handleObjectClick(
        "Распределительный щит",
        "Контролирует подачу энергии и защищает от перегрузок",
        infoPosition
      );
    }
  };

  // Функция для обработки наведения на объект
  const handleHover = () => {
    if (handleObjectHover) {
      handleObjectHover("Распределительный щит");
    }
  };

  return (
    <DistributionBoxWithHoverEffect
      position={position}
      rotation={rotation}
      scale={scale}
      handleObjectClick={handleObjectClick}
      onClick={handleClick}
      onHover={handleHover}
      {...restProps}
    />
  );
};

export default DistributionBox;
