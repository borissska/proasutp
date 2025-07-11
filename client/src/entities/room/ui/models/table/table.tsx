import { FC } from "react";
import { BaseModel } from "../base-model/base-model";
import { MODEL_PATHS } from "../../../model/constants";
import { TableProps } from "./table.props";

export const Table: FC<TableProps> = ({ position, rotation, scale, name = "Table" }) => {
  return (
    <BaseModel
      position={position}
      rotation={rotation}
      scale={scale}
      modelPath={MODEL_PATHS.TABLE}
      name={name}
    />
  );
};
