import { useFBX } from "@react-three/drei";
import { FC, useRef, useEffect } from "react";
import { DistributionBoxProps } from "./DistributionBox.props";
import { Group, Object3D } from "three";

useFBX.preload("./DistributionBox/model.fbx");

/**
 * Базовый компонент распределительного щита без эффектов
 */
const BaseDistributionBox: FC<DistributionBoxProps> = ({
  position,
  rotation,
  scale,
}) => {
  const groupRef = useRef<Group>(null);
  const modelRef = useRef<Group>(null);

  // Загрузка модели с помощью хука useFBX (должен вызываться безусловно)
  // Используем альтернативный путь для модели
  const distributionBoxModel = useFBX("./DistributionBox/model.fbx");

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <primitive ref={modelRef} object={distributionBoxModel} />
    </group>
  );
};

export default BaseDistributionBox;
