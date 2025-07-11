import { Position3D, Rotation3D } from "@/shared/types/three";

export interface TableProps {
  position: Position3D;
  rotation: Rotation3D;
  scale: number;
  name: string;
} 