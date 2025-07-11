import { Camera, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { MovementState } from "../model/types";
import { CAMERA_CONFIG } from "../model/constants";
import { toVector3 } from "../../../shared/types/three";

export const useCameraMovement = (camera: Camera | null, movement: MovementState) => {
  useFrame(() => {
    if (!camera) return;

    const { speed, playerHeight, playerRadius, roomBounds } = CAMERA_CONFIG;

    // Создаем вектор направления движения
    const frontVector = new Vector3();
    const sideVector = new Vector3();

    // Определяем направление движения на основе нажатых клавиш
    if (movement.forward) frontVector.z = 1;
    if (movement.backward) frontVector.z = -1;
    if (movement.left) sideVector.x = -1;
    if (movement.right) sideVector.x = 1;

    // Применяем движение только если есть ввод от пользователя
    if (frontVector.length() > 0 || sideVector.length() > 0) {
      // Получаем направление камеры
      const cameraDirection = new Vector3();
      camera.getWorldDirection(cameraDirection);

      // Обнуляем вертикальную составляющую для горизонтального перемещения
      cameraDirection.y = 0;
      cameraDirection.normalize();

      // Создаем вектор вправо от направления камеры
      const cameraRight = new Vector3(-cameraDirection.z, 0, cameraDirection.x);

      // Вектор желаемого перемещения
      const moveVector = new Vector3();

      // Добавляем компоненты движения
      if (frontVector.z !== 0) {
        moveVector.addScaledVector(cameraDirection, frontVector.z);
      }

      if (sideVector.x !== 0) {
        moveVector.addScaledVector(cameraRight, sideVector.x);
      }

      // Нормализуем и применяем скорость
      if (moveVector.length() > 0) {
        moveVector.normalize().multiplyScalar(speed);

        // Рассчитываем новую позицию
        const currentPos = toVector3(camera.position);
        const newPosition = currentPos.clone().add(moveVector);

        // Проверяем коллизии и обновляем позицию
        const minX = roomBounds.minX + playerRadius;
        const maxX = roomBounds.maxX - playerRadius;
        const minZ = roomBounds.minZ + playerRadius;
        const maxZ = roomBounds.maxZ - playerRadius;
        const minY = roomBounds.minY + playerHeight;
        const maxY = roomBounds.maxY - 0.5;

        // Применяем ограничения по осям
        camera.position.set(
          Math.max(minX, Math.min(maxX, newPosition.x)),
          Math.max(minY, Math.min(maxY, newPosition.y)),
          Math.max(minZ, Math.min(maxZ, newPosition.z))
        );
      }
    }
  });
}; 