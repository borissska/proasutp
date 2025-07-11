import { Camera } from "three";

export interface MovementState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

export interface CameraConfig {
  speed: number;
  playerHeight: number;
  playerRadius: number;
  roomBounds: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
    minY: number;
    maxY: number;
  };
  defaultPosition: [number, number, number];
} 