import { Vector3 } from "three";

export interface BoxProps { 
    position: [number, number, number], 
    rotation: [number, number, number], 
    handleObjectClick: (title: string, description: string, infoPosition: Vector3) => void,
    handleObjectHover?: (title: string) => void,
    name: string 
}