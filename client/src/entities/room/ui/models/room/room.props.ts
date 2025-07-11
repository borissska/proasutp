import { Position3D, Rotation3D } from "@/shared/types/three";

export interface RoomProps {
  position: Position3D;
  rotation: Rotation3D;
  scale: number;
  name: string;
} 