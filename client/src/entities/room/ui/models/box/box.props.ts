import { Position3D, Rotation3D } from "@/shared/types/three";
import { BaseModelProps } from "../../../model/types";

export interface BoxProps extends BaseModelProps {
  position: Position3D;
  rotation: Rotation3D;
  scale: number;
  name: string;
}