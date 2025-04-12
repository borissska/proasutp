import { Vector3 } from "three";

export interface ControlPanelProps {
    position: [number, number, number];
    rotation: [number, number, number];
    handleObjectClick: (title: string, description: string, position: Vector3) => void;
  }