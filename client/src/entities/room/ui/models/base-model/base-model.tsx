import { FC, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useModel } from "../../../../../shared/lib/hooks/use-model";
import { MODEL_PATHS } from "../../../model/constants";
import { ModelComponentProps } from "./base-model.props";
import { useLoadingInternal } from "../../../../../app/providers/LoadingProvider/ui/LoadingProvider";
import { Group, Mesh } from "three";

/**
 * Базовый компонент для 3D моделей
 * Использует централизованный кеш моделей
 */
export const BaseModel: FC<ModelComponentProps> = ({
  position,
  rotation,
  scale,
  name,
  modelPath,
  modelType = "BOX",
  enableReadinessCheck = true,
}) => {
  const path = modelPath || MODEL_PATHS[modelType];
  const scene = useModel(path);
  const { _setSceneReady } = useLoadingInternal();

  // Refs для проверки готовности (используются только если enableReadinessCheck=true)
  const groupRef = useRef<Group>(null);
  const frameCount = useRef(0);
  const isReady = useRef(false);
  const startTime = useRef<number>(Date.now());

  // Проверка готовности модели (только для неинтерактивных моделей)
  useFrame(() => {
    if (!enableReadinessCheck || !scene || !groupRef.current || isReady.current) return;

    frameCount.current++;
    const elapsedTime = Date.now() - startTime.current;

    // Проверяем готовность после нескольких кадров
    if (frameCount.current >= 3) {
      let meshCount = 0;

      groupRef.current.traverse((child) => {
        if (child instanceof Mesh && child.visible && child.geometry && child.material) {
          meshCount++;
        }
      });

      // Если модель содержит меши или прошло более 3 секунд (fallback)
      if (meshCount > 0 || elapsedTime > 3000) {
        const reason =
          meshCount > 0
            ? `Meshes: ${meshCount}, Frames: ${frameCount.current}`
            : "Fallback timeout";

        console.log(`🎯 ${name} is ready! ${reason}`);
        isReady.current = true;
        _setSceneReady(true);
      }
    }
  });

  // Сброс состояния при размонтировании
  useEffect(() => {
    if (enableReadinessCheck) {
      startTime.current = Date.now();
      return () => {
        isReady.current = false;
      };
    }
  }, [enableReadinessCheck]);

  if (!scene) return null;

  // Если проверка готовности включена, оборачиваем в group с ref
  if (enableReadinessCheck) {
    return (
      <group ref={groupRef}>
        <primitive
          object={scene}
          position={position}
          rotation={rotation}
          scale={scale}
          name={name}
        />
      </group>
    );
  }

  // Для интерактивных моделей возвращаем как раньше
  return (
    <primitive object={scene} position={position} rotation={rotation} scale={scale} name={name} />
  );
};

BaseModel.displayName = "BaseModel";
