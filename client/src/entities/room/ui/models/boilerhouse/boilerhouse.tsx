import { FC } from "react";
import { BaseModel } from "../base-model/base-model";
import { withInteractiveModelCollision } from "../../../../../shared/lib/hocs/with-interactive-model";
import { MODEL_PATHS } from "../../../model/constants";
import { BoilerhouseProps } from "./boilerhouse.props";

const BoilerhouseBase: FC<BoilerhouseProps> = ({
  position,
  rotation,
  scale,
  name = "Boilerhouse",
}) => {
  return (
    <BaseModel
      position={position}
      rotation={rotation}
      scale={scale}
      modelPath={MODEL_PATHS.BOILERHOUSE}
      name={name}
    />
  );
};

const InteractiveBoilerhouse = withInteractiveModelCollision(BoilerhouseBase);

export const Boilerhouse: FC<BoilerhouseProps> = ({
  position,
  rotation,
  scale,
  name,
  onClick,
  onHover,
}) => {
  return (
    <InteractiveBoilerhouse
      position={position}
      rotation={rotation}
      scale={scale}
      name={name}
      onClick={onClick}
      onHover={onHover}
    />
  );
};
