import { useFBX } from "@react-three/drei";
import { FC, useRef, useEffect } from "react";
import { DistributionBoxProps } from "./DistributionBox.props";
import { Group, Object3D, Mesh } from "three";

useFBX.preload("./DistributionBox/model.fbx");

/**
 * Базовый компонент распределительного щита без эффектов
 */
const BaseDistributionBox: FC<DistributionBoxProps> = ({ position, rotation, scale }) => {
  const groupRef = useRef<Group>(null);
  const modelRef = useRef<Group>(null);

  // Загрузка модели с помощью хука useFBX (должен вызываться безусловно)
  // Используем альтернативный путь для модели
  const distributionBoxModel = useFBX("./DistributionBox/model.fbx");

  // Настройка модели после загрузки
  useEffect(() => {
    if (distributionBoxModel) {
      // Включаем обработку лучей для всех дочерних элементов модели
      distributionBoxModel.traverse((child) => {
        // Делаем все меши интерактивными
        if (child instanceof Mesh) {
          // Включаем raycast для всех элементов
          child.raycast = function (raycaster, intersects) {
            Mesh.prototype.raycast.call(this, raycaster, intersects);
          };
        }
      });

      // Клонируем модель, чтобы избежать проблем с общими ссылками
      const clonedModel = distributionBoxModel.clone();

      // Применяем модель к примитиву
      if (modelRef.current) {
        modelRef.current.add(clonedModel);
      }
    }
  }, [distributionBoxModel]);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <group ref={modelRef} />
    </group>
  );
};

export default BaseDistributionBox;
