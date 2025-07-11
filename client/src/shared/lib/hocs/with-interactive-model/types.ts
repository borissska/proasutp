export interface InteractiveModelOptions {
  throttleTime?: number;
  enableEmissive?: boolean;
  emissiveIntensity?: number;
  // Опции для коллизионной модели
  collisionBoxSize?: [number, number, number]; // Размеры коллизионной модели [x, y, z]
  collisionBoxOffset?: [number, number, number]; // Смещение коллизионной модели относительно основной
}

export interface WithInteractionProps {
  onClick?: () => void;
  onHover?: (isHovered: boolean) => void;
} 