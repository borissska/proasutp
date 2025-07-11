import { Position3D, Rotation3D } from "../../../shared/types/three";
import { Vector3 } from "three";
import { WithInteractionProps } from "@/shared/lib/hocs/with-interactive-model/types";

// Base props for all interactive models
export interface BaseModelProps extends WithInteractionProps {
  position: Position3D;
  rotation: Rotation3D;
  scale: number;
  name: string;
  onClick?: () => void;
  onHover?: (isHovered: boolean) => void;
}

// UI elements props
export interface InfoCardProps {
  title: string;
  description: string;
  isVisible: boolean;
  onClose: () => void;
}

// Определение типа для состояния информационной карточки
export interface InfoCardState {
  visible: boolean;
  title: string;
  description: string;
  position: Position3D;
  width: number;
}

// Обработчики событий для объектов комнаты
export type ObjectClickHandler = (
  title: string,
  description: string,
  position: Position3D,
  width?: number
) => void;

export type ObjectHoverHandler = (hovered: boolean) => void;

export interface RoomProps extends BaseModelProps {}
export interface LogoProps extends BaseModelProps {}
export interface BoxProps extends BaseModelProps {}
export interface DistributionBoxProps extends BaseModelProps {}
export interface ElectricityBoxProps extends BaseModelProps {}
export interface ModelProps extends BaseModelProps {}
export interface NotepadProps extends BaseModelProps {}
export interface PhoneProps extends BaseModelProps {}
export interface TableProps extends BaseModelProps {}
export interface WallBoxProps extends BaseModelProps {}
export interface AlarmLightProps extends BaseModelProps {}

export interface RoomModelProps {
  position?: Vector3;
  rotation?: Vector3;
  scale?: Vector3;
}

export interface RoomLoadingState {
  isRoomLoaded: boolean;
  isEnvironmentLoaded: boolean;
  isModelsLoaded: boolean;
  errors: string[];
}

export interface UseRoomLoadingResult extends RoomLoadingState {
  isFullyLoaded: boolean;
  addError: (error: string) => void;
  setRoomLoaded: (loaded: boolean) => void;
  setEnvironmentLoaded: (loaded: boolean) => void;
  setModelsLoaded: (loaded: boolean) => void;
} 