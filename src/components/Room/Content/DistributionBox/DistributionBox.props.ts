import { Vector3 } from "three";

export interface DistributionBoxProps {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    handleObjectClick?: (title: string, description: string, position: Vector3) => void;
    handleObjectHover?: (title: string) => void;
}