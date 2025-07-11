import { Mesh, MeshStandardMaterial } from "three";
import { InteractiveObject3D } from "../../../../types/three";

/**
 * Обработка материалов для интерактивных объектов
 */
export const handleMaterials = (
  object: InteractiveObject3D | null,
  isHovered: boolean,
  emissiveIntensity: number = 0.5
) => {
  if (!object) return;

  object.traverse((child) => {
    if (child instanceof Mesh && child.material) {
      // Для одного материала
      if (!Array.isArray(child.material)) {
        if (child.material instanceof MeshStandardMaterial) {
          child.material.emissiveIntensity = isHovered ? emissiveIntensity : 0;
        }
      }
      // Для массива материалов
      else {
        child.material.forEach((mat) => {
          if (mat instanceof MeshStandardMaterial) {
            mat.emissiveIntensity = isHovered ? emissiveIntensity : 0;
          }
        });
      }
    }
  });
};

/**
 * Настраивает интерактивность для всех дочерних элементов
 */
export const setupInteractivity = (object: InteractiveObject3D | null): void => {
  if (!object) return;

  object.traverse((child) => {
    if (child instanceof Mesh) {
      // Помечаем объект как интерактивный
      if (!child.userData.__interactive) {
        child.userData.__interactive = true;

        // Сохраняем оригинальный raycast
        const originalRaycast = child.raycast;
        child.raycast = function (raycaster, intersects) {
          originalRaycast.call(this, raycaster, intersects);
        };
      }
    }
  });
}; 