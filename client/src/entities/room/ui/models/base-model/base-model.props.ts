import { Position3D, Rotation3D } from "@/shared/types/three";
import { MODEL_PATHS } from "../../../model/constants";

export interface ModelComponentProps {
    position: Position3D;
    rotation: Rotation3D;
    scale: number;
    name: string;
    modelPath?: string;
    modelType?: keyof typeof MODEL_PATHS;
    /** Включить проверку готовности модели для системы загрузки. По умолчанию: true */
    enableReadinessCheck?: boolean;
  }
  