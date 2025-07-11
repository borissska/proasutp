import { Camera } from "three";
import { CAMERA_CONFIG } from "../model/constants";
import { useCameraPersistence as useAdvancedCameraPersistence } from "../../../shared/lib/hooks/use-camera-persistence";

export const useCameraPersistence = (camera: Camera | null) => {
  useAdvancedCameraPersistence(camera, {
    key: "camera",
    saveInterval: 1000,
    bounds: CAMERA_CONFIG.roomBounds
  });
}; 