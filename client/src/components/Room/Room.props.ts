import { Vector3 } from "three";

// Определение типа для состояния информационной карточки
export interface InfoCardState {
    visible: boolean;
    title: string;
    description: string;
    position: Vector3;
    width: number;
  }

export interface ObjectClickHandler {
  (title: string, description: string, position: Vector3, width: number): void;
}

export interface ObjectHoverHandler {
  (hovered: boolean): void;
}
