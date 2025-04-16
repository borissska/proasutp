import { FC } from "react";
import { BoxProps } from "./Box.props";
import { Vector3 } from "three";
import withHoverEffect from "../HOC/withHoverEffect";
import { WithHoverEffectProps } from "../HOC/withHoverEffect.props";
import BaseBox from "./BaseBox";

// Создаем компонент Box с эффектами наведения и клика
const Box: FC<BoxProps & WithHoverEffectProps> = (props) => {
  const { position, rotation, handleObjectClick, handleObjectHover, name, ...restProps } = props;

  // Создаем HOC с нашим базовым компонентом
  const BoxWithHoverEffect = withHoverEffect(BaseBox);

  // Функция для обработки клика на объект
  const handleClick = () => {
    if (handleObjectClick) {
      const infoPosition = new Vector3(position[0], position[1] + 0.5, position[2]);

      handleObjectClick(
        "Области деятельности",
        `Мы занимаемся поставкой оборудования для производства и промышленных предприятий`,
        infoPosition
      );
    }
  };

  // Функция для обработки наведения на объект
  const handleHover = () => {
    if (handleObjectHover) {
      handleObjectHover(name);
    }
  };

  return (
    <BoxWithHoverEffect
      position={position}
      rotation={rotation}
      handleObjectClick={handleObjectClick}
      name={name}
      onClick={handleClick}
      onHover={handleHover}
      {...restProps}
    />
  );
};

export default Box;
