import { Vector3 } from "three";
import { ObjectClickHandler, ObjectHoverHandler } from "../../Room.props";

export interface PhoneProps { 
    position: [number, number, number], 
    rotation: [number, number, number], 
    handleObjectClick?: ObjectClickHandler,
    handleObjectHover?: ObjectHoverHandler,
    name: string 
}