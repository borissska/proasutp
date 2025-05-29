import { Vector3 } from "three";
import { ObjectClickHandler, ObjectHoverHandler } from "../../Room.props";

export interface DistributionBoxProps {
    position: [number, number, number];
    rotation: [number, number, number];
    scale?: number;
    name?: string;
    handleObjectClick?: ObjectClickHandler;
    handleObjectHover?: ObjectHoverHandler;
}