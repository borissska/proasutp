import { Vector3 } from "@react-three/fiber";

// Определение типа для состояния информационной карточки
export interface InfoCardState {
    visible: boolean;
    title: string;
    description: string;
    position: Vector3;
  }
