import { FC, useCallback } from "react";
import { PhoneProps } from "./Phone.props";
import { Vector3, Object3D } from "three";
import BasePhone from "./BasePhone";
import createInteractiveModel from "../HOC/createNewInteractiveModel";

/**
 * Компонент Phone с эффектами интерактивности
 */
const Phone: FC<PhoneProps> = (props) => {
  const { position, rotation, handleObjectClick, handleObjectHover, name } = props;

  // Создаем HOC с нашим базовым компонентом
  const InteractivePhone = createInteractiveModel(BasePhone);

  // Функция для обработки клика на объект
  const handleClick = useCallback(() => {
    if (handleObjectClick) {
      const infoPosition = new Vector3(position[0], position[1] + 0.5, position[2]);

      handleObjectClick(
        "Информация о компании",
        `Эл почта: sales@asutp.pro \n
        юр. адрес: 614066, г. Пермь, ул. Чайковского, д.33, оф.314\n
        ИНН: 1657000010\n
        ОГРН: 1181690000000\n
        ссылка на сро: https://asutp.pro/sro\n
        Год начала работы: 2018`,
        infoPosition,
        320
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
    <InteractivePhone
      position={position}
      rotation={rotation}
      name={name}
      onClick={handleClick}
      onHover={handleHover}
    />
  );
};

export default Phone;
