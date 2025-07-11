import { FC } from "react";
import { BaseModel } from "../base-model/base-model";
import { withInteractiveModelCollision } from "../../../../../shared/lib/hocs/with-interactive-model";
import { MODEL_PATHS } from "../../../model/constants";
import { DistributionBoxProps } from "./distribution-box.props";

const DistributionBoxBase: FC<DistributionBoxProps> = ({
  position,
  rotation,
  scale,
  name = "DistributionBox",
}) => {
  return (
    <BaseModel
      position={position}
      rotation={rotation}
      scale={scale}
      modelPath={MODEL_PATHS.DISTRIBUTION_BOX}
      name={name}
    />
  );
};

const InteractiveDistributionBox = withInteractiveModelCollision(DistributionBoxBase);

export const DistributionBox: FC<DistributionBoxProps> = ({
  position,
  rotation,
  scale,
  name,
  onClick,
  onHover,
}) => {
  return (
    <InteractiveDistributionBox
      position={position}
      rotation={rotation}
      scale={scale}
      name={name}
      onClick={onClick}
      onHover={onHover}
    />
  );
};
