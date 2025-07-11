// Types
export type {
  InteractiveObject3D,
  Position3D,
  Rotation3D,
  ScreenPosition,
} from "./types";

// Utils
export {
  worldToScreen,
  isPositionInBounds,
} from "./lib/utils";

// Hooks
export {
  useAssetLoader,
  useModel,
  useSceneReady,
  useCameraPersistence,
  useInfoCardManager,
} from "./lib/hooks";

// HOCs
export {
  withInteractiveModelCollision,
} from "./lib/hocs/with-interactive-model";
export type {
  WithInteractionProps,
  InteractiveModelOptions,
} from "./lib/hocs/with-interactive-model/types";

// UI Components
export { InfoCard } from "./ui/info-card";
export type { InfoCardProps } from "./ui/info-card/info-card.props"; 

export * from './types';
export * from './ui';
export * from './lib/model-loading'; 