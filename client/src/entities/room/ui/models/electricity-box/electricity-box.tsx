import { FC } from "react";
import { BaseModel } from "../base-model/base-model";
import { withInteractiveModelCollision } from "../../../../../shared/lib/hocs/with-interactive-model";
import { MODEL_PATHS } from "../../../model/constants";
import { ElectricityBoxProps } from "./electricity-box.props";

const ElectricityBoxBase: FC<ElectricityBoxProps> = ({
  position,
  rotation,
  scale,
  name = "ElectricityBox",
}) => {
  return (
    <BaseModel
      position={position}
      rotation={rotation}
      scale={scale}
      modelPath={MODEL_PATHS.ELECTRICITY_BOX}
      name={name}
    />
  );
};

const InteractiveElectricityBox = withInteractiveModelCollision(ElectricityBoxBase);

export const ElectricityBox: FC<ElectricityBoxProps> = ({
  position,
  rotation,
  scale,
  name,
  onClick,
  onHover,
}) => {
  return (
    <InteractiveElectricityBox
      position={position}
      rotation={rotation}
      scale={scale}
      name={name}
      onClick={onClick}
      onHover={onHover}
    />
  );
};
