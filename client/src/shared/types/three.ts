import { Object3D, Material, Vector3, Euler } from "three";

export interface InteractiveObject3D extends Object3D {
  __interactive?: boolean;
  material?: Material | Material[];
}

export type Position3D = [number, number, number] | Vector3;
export type Rotation3D = [number, number, number] | Euler;

export interface ScreenPosition {
  x: number;
  y: number;
}

export type HoverHandler = (isHovered: boolean) => void;
export type ClickHandler = () => void;

export type ObjectHoverHandler = (hovered: boolean) => void;
export type ObjectClickHandler = (title: string, description: string, position: Position3D, width: number) => void;

export const toVector3 = (position: Position3D): Vector3 => {
  if (Array.isArray(position)) {
    return new Vector3(...position);
  }
  return position;
};

export const toEuler = (rotation: Rotation3D): Euler => {
  if (Array.isArray(rotation)) {
    return new Euler(...rotation, "XYZ");
  }
  return rotation;
};

export const isVector3 = (value: any): value is Vector3 => {
  return value && typeof value === 'object' && 'x' in value && 'y' in value && 'z' in value;
};

export const isEuler = (value: any): value is Euler => {
  return value && typeof value === 'object' && 'x' in value && 'y' in value && 'z' in value && '_order' in value;
}; 