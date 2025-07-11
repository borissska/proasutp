import { Position3D, Rotation3D } from "@/shared/types/three";
import { ObjectClickHandler, ObjectHoverHandler } from "../../../model";

export interface LogoProps {
  position: Position3D;
  rotation: Rotation3D;
  scale: number;
  name: string;
  handleObjectClick?: ObjectClickHandler;
  handleObjectHover?: ObjectHoverHandler;
} 