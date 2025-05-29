import { useFBX } from "@react-three/drei";
import { FC, useRef, useMemo, useEffect, forwardRef } from "react";
import { DistributionBoxProps } from "./DistributionBox.props";
import { Group, Mesh } from "three";

// Предварительно загружаем модель
useFBX.preload("./DistributionBox/model.fbx");

/**
 * Базовый компонент распределительного щита без эффектов
 */
const BaseDistributionBox = forwardRef<
  Group,
  Omit<DistributionBoxProps, "handleObjectHover" | "handleObjectClick">
>(({ position, rotation, scale = 1 }, ref) => {
  const localRef = useRef<Group>(null);
  const boxRef = ref || localRef;

  // Загружаем FBX модель
  const distributionBoxModel = useFBX("./DistributionBox/model.fbx");

  // Клонируем и оптимизируем модель один раз
  const optimizedModel = useMemo(() => {
    if (!distributionBoxModel) return null;

    const cloned = distributionBoxModel.clone();

    // Оптимизируем геометрию и материалы
    cloned.traverse((child) => {
      if (child instanceof Mesh) {
        // Оптимизируем геометрию
        if (child.geometry) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }

        // Делаем меш интерактивным
        child.userData.__interactive = true;

        // Оптимизируем материалы
        if (child.material) {
          child.material.needsUpdate = false;
        }
      }
    });

    return cloned;
  }, [distributionBoxModel]);

  useEffect(() => {
    if (boxRef && "current" in boxRef && boxRef.current && optimizedModel) {
      // Добавляем оптимизированную модель
      boxRef.current.add(optimizedModel);
    }
  }, [optimizedModel, boxRef]);

  return (
    <group ref={boxRef} position={position} rotation={rotation} scale={[scale, scale, scale]} />
  );
});

BaseDistributionBox.displayName = "BaseDistributionBox";

export default BaseDistributionBox;
