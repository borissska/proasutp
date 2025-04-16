import { Vector3 } from "three";

export interface MoonProps {
    centerPosition: Vector3;
    orbitRadius: number;
    radius: number;
    rotationSpeed?: number;
    orbitSpeed?: number;
}