import { FC } from "react";
import { BaseModel } from "../base-model/base-model";
import { withInteractiveModelCollision } from "../../../../../shared/lib/hocs/with-interactive-model";
import { MODEL_PATHS } from "../../../model/constants";
import { WallBoxProps } from "./wall-box.props";

const WallBoxBase: FC<WallBoxProps> = ({ position, rotation, scale, name = "WallBox" }) => {
  return (
    <BaseModel
      position={position}
      rotation={rotation}
      scale={scale}
      modelPath={MODEL_PATHS.WALL_BOX}
      name={name}
    />
  );
};

const InteractiveWallBox = withInteractiveModelCollision(WallBoxBase);

export const WallBox: FC<WallBoxProps> = ({
  position,
  rotation,
  scale,
  name,
  onClick,
  onHover,
}) => {
  return (
    <InteractiveWallBox
      position={position}
      rotation={rotation}
      scale={scale}
      name={name}
      onClick={onClick}
      onHover={onHover}
    />
  );
};
