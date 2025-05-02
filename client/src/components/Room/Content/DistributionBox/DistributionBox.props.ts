import { Vector3 } from "three";
import { ObjectClickHandler, ObjectHoverHandler } from "../../Room.props";

export interface DistributionBoxProps {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    handleObjectClick?: ObjectClickHandler;
    handleObjectHover?: ObjectHoverHandler;
}