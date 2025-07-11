import { FC } from "react";
import { BaseModel } from "../base-model/base-model";
import { withInteractiveModelCollision } from "../../../../../shared/lib/hocs/with-interactive-model";
import { BoxProps } from "./box.props";

const BoxBase: FC<BoxProps> = ({ position, rotation, scale, name = "Box" }) => {
  return (
    <BaseModel position={position} rotation={rotation} scale={scale} name={name} modelType='BOX' />
  );
};

const InteractiveBox = withInteractiveModelCollision(BoxBase);

export const Box: FC<BoxProps> = ({ position, rotation, scale, name, onClick, onHover }) => {
  return (
    <InteractiveBox
      position={position}
      rotation={rotation}
      scale={scale}
      name={name}
      onClick={onClick}
      onHover={onHover}
    />
  );
};
