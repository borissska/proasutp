import { Object3D } from "three";

// Интерфейс свойств для HOC withHoverEffect
export interface WithHoverEffectProps {
    // Добавляем возможность передать настройки подсветки
    hoverEffect?: {
      color: number;
      intensity: number;
    };
    clickEffect?: {
      color: number;
      intensity: number;
      duration: number;
    };
    onHover?: (object: Object3D | null) => void;
    onClick?: (object: Object3D | null) => void;
  }