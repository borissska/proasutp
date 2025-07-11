import { Position3D } from "../../types/three";

export interface InfoCardProps {
  title: string;
  description: string;
  position: Position3D;
  visible?: boolean;
  width?: number;
} 