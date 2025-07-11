import { FC } from "react";
import { BaseModel } from "../base-model/base-model";
import { withInteractiveModelCollision } from "../../../../../shared/lib/hocs/with-interactive-model";
import { MODEL_PATHS } from "../../../model/constants";
import { NotepadProps } from "./notepad.props";

const NotepadBase: FC<NotepadProps> = ({ position, rotation, scale, name = "Notepad" }) => {
  return (
    <BaseModel
      position={position}
      rotation={rotation}
      scale={scale}
      modelPath={MODEL_PATHS.NOTEPAD}
      name={name}
    />
  );
};

const InteractiveNotepad = withInteractiveModelCollision(NotepadBase);

export const Notepad: FC<NotepadProps> = ({
  position,
  rotation,
  scale,
  name,
  onClick,
  onHover,
}) => {
  return (
    <InteractiveNotepad
      position={position}
      rotation={rotation}
      scale={scale}
      name={name}
      onClick={onClick}
      onHover={onHover}
    />
  );
};
