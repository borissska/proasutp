import { FC, useCallback } from "react";
import { ModelProps } from "./Model.props";
import { Vector3 } from "three";
import BaseModel from "./BaseModel";
import createInteractiveModel from "../HOC/createNewInteractiveModel";

// Создаем HOC с нашим базовым компонентом один раз
const InteractiveModel = createInteractiveModel(BaseModel);

/**
 * Компонент Model с эффектами интерактивности
 */
const Model: FC<ModelProps> = (props) => {
  const {
    position = [2.65, 0.98, 8.25],
    rotation = [0, Math.PI / 2, 0],
    handleObjectClick,
    handleObjectHover,
    name = "Model",
  } = props;

  // Функция для обработки клика на объект
  const handleClick = useCallback(() => {
    if (handleObjectClick) {
      const infoPosition = new Vector3(position[0], position[1] + 0.5, position[2]);

      handleObjectClick(
        "3D Модель",
        `Интерактивная 3D модель для демонстрации возможностей`,
        infoPosition,
        320
      );
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
    <InteractiveModel
      position={position}
      rotation={rotation}
      name={name}
      onClick={handleClick}
      onHover={handleHover}
    />
  );
};

export default Model;
