import { Vector3 } from 'three';

export interface SunProps {
    position?: Vector3 | [number, number, number];
    radius?: number;
} 