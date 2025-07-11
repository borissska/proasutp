import { FC } from "react";
import { BaseModel } from "../base-model/base-model";
import { withInteractiveModelCollision } from "../../../../../shared/lib/hocs/with-interactive-model";
import { MODEL_PATHS } from "../../../model/constants";
import { PhoneProps } from "./phone.props";

const PhoneBase: FC<PhoneProps> = ({ position, rotation, scale, name = "Phone" }) => {
  return (
    <BaseModel
      position={position}
      rotation={rotation}
      scale={scale}
      modelPath={MODEL_PATHS.PHONE}
      name={name}
    />
  );
};

const InteractivePhone = withInteractiveModelCollision(PhoneBase);

export const Phone: FC<PhoneProps> = ({ position, rotation, scale, name, onClick, onHover }) => {
  return (
    <InteractivePhone
      position={position}
      rotation={rotation}
      scale={scale}
      name={name}
      onClick={onClick}
      onHover={onHover}
    />
  );
};
