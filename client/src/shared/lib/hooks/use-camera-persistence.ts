import { useEffect, useRef } from "react";
import { Camera, Euler, Vector3 } from "three";

interface CameraPersistenceConfig {
  key: string;
  saveInterval?: number;
  bounds?: {
    minX: number; maxX: number;
    minY: number; maxY: number;
    minZ: number; maxZ: number;
  };
}

interface CameraState {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

export const useCameraPersistence = (
  camera: Camera | null,
  config: CameraPersistenceConfig
) => {
  const lastSaveTime = useRef(0);
  const saveInterval = config.saveInterval || 1000;
  const isInitialized = useRef(false);
  const hasRestoredState = useRef(false);

  useEffect(() => {
    if (!camera || isInitialized.current) return;

    // Загружаем сохраненное состояние камеры ТОЛЬКО один раз
    const savedState = localStorage.getItem(`${config.key}_state`);
    if (savedState && !hasRestoredState.current) {
      try {
        const state: CameraState = JSON.parse(savedState);
        
        // Проверяем валидность позиции
        let isValidPosition = true;
        if (config.bounds) {
          const pos = state.position;
          isValidPosition = pos.x >= config.bounds.minX &&
                           pos.x <= config.bounds.maxX &&
                           pos.y >= config.bounds.minY &&
                           pos.y <= config.bounds.maxY &&
                           pos.z >= config.bounds.minZ &&
                           pos.z <= config.bounds.maxZ;
        }

        if (isValidPosition && state.position && state.rotation) {
          // Небольшая задержка, чтобы PointerLockControls успели инициализироваться
          setTimeout(() => {
            if (camera) {
              // Восстанавливаем только позицию, поворот пусть управляется PointerLockControls
              camera.position.set(state.position.x, state.position.y, state.position.z);
              console.log('📍 Camera position restored:', state.position);
              hasRestoredState.current = true;
            }
          }, 100);
        }
      } catch (error) {
        console.error("Error loading camera state:", error);
      }
    }

    isInitialized.current = true;
  }, [camera, config.key, config.bounds]);

  useEffect(() => {
    if (!camera || !isInitialized.current) return;

    // Функция для сохранения только позиции (не поворота, чтобы не конфликтовать с PointerLockControls)
    const saveCameraState = () => {
      const now = Date.now();
      if (now - lastSaveTime.current < saveInterval) return;
      
      lastSaveTime.current = now;
      
      const state: CameraState = {
        position: {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
        },
        rotation: {
          x: camera.rotation.x,
          y: camera.rotation.y,
          z: camera.rotation.z,
        }
      };
      
      localStorage.setItem(`${config.key}_state`, JSON.stringify(state));
      // Убираем подробное логирование для производительности
      // console.log('💾 Camera state saved:', state);
    };

    // Сохраняем при закрытии страницы
    const handleBeforeUnload = () => saveCameraState();

    // Периодическое сохранение только позиции
    const interval = setInterval(() => {
      if (camera && camera.position) {
        saveCameraState();
      }
    }, saveInterval);

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      saveCameraState(); // Финальное сохранение
    };
  }, [camera, config.key, saveInterval]);
};