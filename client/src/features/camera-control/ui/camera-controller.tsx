import { FC, useEffect, useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { MovementState } from "../model/types";
import { useCameraMovement } from "../lib/use-camera-movement";
import { useCameraPersistence } from "../lib/use-camera-persistence";
import { useKeyboardControls } from "../lib/use-keyboard-controls";
import { CAMERA_CONFIG } from "../model/constants";

export const CameraController: FC = () => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const [movement, setMovement] = useState<MovementState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализация камеры ТОЛЬКО один раз
  useEffect(() => {
    const savedState = localStorage.getItem("camera_state");

    if (!savedState) {
      // Устанавливаем дефолтную позицию только если нет сохраненной
      camera.position.set(...CAMERA_CONFIG.defaultPosition);
      camera.lookAt(0, 0, 0);
      console.log("🎥 Camera initialized with default position");
    }

    setIsInitialized(true);
  }, [camera]);

  // Сохранение и загрузка состояния камеры
  useCameraPersistence(camera);

  // Обработка клавиатурного ввода
  useKeyboardControls(setMovement);

  // Обработка движения камеры
  useCameraMovement(camera, movement);

  // Обработчик для синхронизации с PointerLockControls
  const handleControlsChange = () => {
    // Синхронизируем состояние при изменении контролов
    if (controlsRef.current && isInitialized) {
      // PointerLockControls автоматически обновляет camera.rotation
      // Нам просто нужно убедиться, что это не конфликтует с нашей системой
    }
  };

  if (!isInitialized) {
    return null; // Не показываем контролы до инициализации
  }

  return <PointerLockControls ref={controlsRef} onChange={handleControlsChange} />;
};
