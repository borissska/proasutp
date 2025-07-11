import { Camera, Vector3, Box3 } from "three";
import { Position3D, ScreenPosition, toVector3 } from "../../types/three";

/**
 * Преобразует 3D позицию в экранные координаты
 */
export const worldToScreen = (position: Position3D, camera: Camera): ScreenPosition => {
  const pos = toVector3(position);
  const vector = pos.clone().project(camera);
  return {
    x: (vector.x * 0.5 + 0.5) * window.innerWidth,
    y: -(vector.y * 0.5 - 0.5) * window.innerHeight,
  };
};

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}

/**
 * Проверяет, находится ли позиция в пределах заданных границ
 */
export const isPositionInBounds = (position: Position3D, bounds: Bounds): boolean => {
  const pos = toVector3(position);
  return (
    pos.x >= bounds.minX &&
    pos.x <= bounds.maxX &&
    pos.y >= bounds.minY &&
    pos.y <= bounds.maxY &&
    pos.z >= bounds.minZ &&
    pos.z <= bounds.maxZ
  );
};

/**
 * Ограничивает позицию в пределах заданных границ
 */
export const clampPositionToBounds = (position: Position3D, bounds: Bounds): Vector3 => {
  const pos = toVector3(position);
  return new Vector3(
    Math.max(bounds.minX, Math.min(bounds.maxX, pos.x)),
    Math.max(bounds.minY, Math.min(bounds.maxY, pos.y)),
    Math.max(bounds.minZ, Math.min(bounds.maxZ, pos.z))
  );
};

/**
 * Получает позицию камеры в виде Vector3
 */
export const getCameraPosition = (camera: Camera): Vector3 => {
  return toVector3(camera.position);
};

/**
 * Устанавливает позицию камеры из Vector3 или массива [x, y, z]
 */
export const setCameraPosition = (camera: Camera, position: Position3D): void => {
  const pos = toVector3(position);
  camera.position.copy(pos);
}; 