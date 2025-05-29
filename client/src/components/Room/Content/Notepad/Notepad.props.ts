import { ObjectClickHandler, ObjectHoverHandler } from "../../Room.props";

export interface NotepadProps {
    position: [number, number, number];
    rotation: [number, number, number];
    handleObjectClick?: ObjectClickHandler;
    handleObjectHover?: ObjectHoverHandler;
    name: string;
} 