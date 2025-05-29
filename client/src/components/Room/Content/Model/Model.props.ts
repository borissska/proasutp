import { ObjectClickHandler, ObjectHoverHandler } from "../../Room.props";

export interface ModelProps { 
    position?: [number, number, number], 
    rotation?: [number, number, number], 
    name?: string,
    handleObjectClick?: ObjectClickHandler,
    handleObjectHover?: ObjectHoverHandler
}