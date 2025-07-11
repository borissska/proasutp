import { FC, ReactNode, createContext, useContext, useState, useCallback } from "react";
import { useAssetLoader } from "../../../../shared/lib/hooks/use-asset-loader";

interface LoadingContextType {
  loadedAssets: number;
  totalAssets: number;
  progress: number;
  isComplete: boolean;
  startLoading: (config: { glbModels: string[]; fbxModels: string[] }) => void;
  resetLoading: () => void;
  loadingStage: "models" | "scene" | "complete";
}

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const {
    loadedAssets,
    totalAssets,
    progress: modelProgress,
    isComplete: modelsLoaded,
    startLoading,
    resetLoading,
  } = useAssetLoader();
  const [sceneReady, setSceneReady] = useState(false);

  // Исправляем логику прогресса
  const isComplete = modelsLoaded && sceneReady;

  let progress: number;
  let loadingStage: "models" | "scene" | "complete";

  if (!modelsLoaded) {
    // 70% на загрузку моделей
    progress = Math.round(modelProgress * 0.7);
    loadingStage = "models";
  } else if (!sceneReady) {
    // 70% + до 30% на подготовку сцены
    progress = 70 + Math.round(Math.min(25, (Date.now() % 1000) / 40)); // Имитируем прогресс
    loadingStage = "scene";
  } else {
    progress = 100;
    loadingStage = "complete";
  }

  const handleSetSceneReady = useCallback((ready: boolean) => {
    console.log(`🎬 Scene ready state changed: ${ready}`);
    setSceneReady(ready);
  }, []);

  const contextValue = {
    loadedAssets,
    totalAssets,
    progress,
    isComplete,
    startLoading,
    resetLoading,
    loadingStage,
    _setSceneReady: handleSetSceneReady,
  } as LoadingContextType & { _setSceneReady: (ready: boolean) => void };

  return <LoadingContext.Provider value={contextValue}>{children}</LoadingContext.Provider>;
};

export const useLoadingInternal = () => {
  const context = useContext(LoadingContext) as any;
  if (!context) {
    throw new Error("useLoadingInternal must be used within a LoadingProvider");
  }
  return context;
};
