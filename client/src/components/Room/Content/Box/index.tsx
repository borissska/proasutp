import { FC, useCallback } from "react";
import { BoxProps } from "./Box.props";
import { Vector3, Object3D } from "three";
import BaseBox from "./BaseBox";
import createInteractiveModel from "../HOC/createNewInteractiveModel";

// Создаем HOC с нашим базовым компонентом один раз
const InteractiveBox = createInteractiveModel(BaseBox);

/**
 * Компонент Box с эффектами интерактивности
 */
const Box: FC<BoxProps> = (props) => {
  const { position, rotation, handleObjectClick, handleObjectHover, name } = props;

  // Функция для обработки клика на объект
  const handleClick = useCallback(() => {
    if (handleObjectClick) {
      const infoPosition = new Vector3(position[0], position[1] + 0.5, position[2]);

      handleObjectClick("Области деятельности", `Мы занимаемся поставкой оборудования для производства и промышленных предприятий`, infoPosition, 320);
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
    <InteractiveBox
      position={position}
      rotation={rotation}
      name={name}
      onClick={handleClick}
      onHover={handleHover}
    />
  );
};

export default Box;
