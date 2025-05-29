import { FC, useCallback } from "react";
import { NotepadProps } from "./Notepad.props";
import { Vector3 } from "three";
import BaseNotepad from "./BaseNotepad";
import createInteractiveModel from "../HOC/createNewInteractiveModel";

// Создаем HOC с нашим базовым компонентом
const InteractiveNotepad = createInteractiveModel(BaseNotepad);

const Notepad: FC<NotepadProps> = (props) => {
  const { position, rotation, handleObjectClick, handleObjectHover, name } = props;

  // Функция для обработки клика на объект
  const handleClick = useCallback(() => {
    if (handleObjectClick) {
      const infoPosition = new Vector3(position[0], position[1], position[2]);
      handleObjectClick("Блокнот", "Записная книжка с важными заметками", infoPosition, 280);
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
    <InteractiveNotepad
      position={position}
      rotation={rotation}
      name={name}
      onClick={handleClick}
      onHover={handleHover}
    />
  );
};

export default Notepad;
