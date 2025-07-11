import { useCallback, useState } from "react";
import { WebGLRenderer, Object3D } from "three";
import { 
  AssetLoaderHook, 
  AssetLoaderState, 
  AssetLoaderConfig
} from "../model-loading";
import { DeviceQualityDetector } from "../model-loading/device-detector";
import { OptimizedLoaderManager } from "../model-loading/loader-manager";
import { modelCache } from "../model-loading/model-cache";

/**
 * Универсальный хук для загрузки оптимизированных 3D-моделей с кешированием
 */
export const useAssetLoader = (): AssetLoaderHook => {
  const [state, setState] = useState<AssetLoaderState>({
    loadedAssets: 0,
    totalAssets: 0,
    progress: 0,
    isComplete: false,
    loadedModels: [],
    failedModels: [],
    compressionStats: {
      totalOriginalSize: 0,
      totalCompressedSize: 0,
      compressionRatio: 0,
      modelsOptimized: 0
    }
  });

  const calculateProgress = useCallback((loaded: number, total: number): number => {
    if (total === 0) return 0;
    const progress = (loaded / total) * 100;
    return Math.min(progress, 100);
  }, []);

  const resetLoading = useCallback(() => {
    setState({
      loadedAssets: 0,
      totalAssets: 0,
      progress: 0,
      isComplete: false,
      loadedModels: [],
      failedModels: [],
      compressionStats: {
        totalOriginalSize: 0,
        totalCompressedSize: 0,
        compressionRatio: 0,
        modelsOptimized: 0
      }
    });
    modelCache.clear();
  }, []);

  const startLoading = useCallback((config: AssetLoaderConfig, renderer?: WebGLRenderer) => {
    const totalModels = config.glbModels.length + config.fbxModels.length;
    
    // Определяем качество устройства
    const deviceQuality = DeviceQualityDetector.detectQuality();
    const useCompression = DeviceQualityDetector.shouldUseCompression(deviceQuality);
    
    console.log(`🚀 Starting optimized loading - Device: ${deviceQuality}, Compression: ${useCompression}`);
    console.log(`📁 Total models: ${totalModels}`);
    
    if (totalModels === 0) {
      setState(prev => ({ ...prev, isComplete: true, progress: 100 }));
      return;
    }

    setState(prev => ({ ...prev, totalAssets: totalModels }));

    const loaderManager = new OptimizedLoaderManager(renderer);
    let mounted = true;
    let loadedCount = 0;
    const loadedModelsList: string[] = [];
    const failedModelsList: string[] = [];

    const updateProgress = (modelPath: string, success: boolean) => {
      if (!mounted) return;
      
      if (success) {
        loadedModelsList.push(modelPath);
      } else {
        failedModelsList.push(modelPath);
      }
      
      loadedCount++;
      const progress = calculateProgress(loadedCount, totalModels);
      const isComplete = loadedCount === totalModels;

      setState(prev => ({
        ...prev,
        loadedAssets: loadedCount,
        progress,
        isComplete,
        loadedModels: [...loadedModelsList],
        failedModels: [...failedModelsList],
        compressionStats: modelCache.getCompressionStats()
      }));

      if (isComplete) {
        const stats = modelCache.getCompressionStats();
        console.log(`✅ Loading complete!`);
        console.log(`📊 Compression stats:`, stats);
        if (stats.totalOriginalSize > 0) {
          console.log(`💾 Space saved: ${(stats.totalOriginalSize - stats.totalCompressedSize).toFixed(0)}KB (${stats.compressionRatio.toFixed(1)}%)`);
        }
        loaderManager.dispose();
      }
    };

    // Загружаем все модели параллельно
    const allModels = [...config.glbModels, ...config.fbxModels];
    
    allModels.forEach(async (modelPath) => {
      try {
        if (modelCache.has(modelPath)) {
          console.log(`⚡ Model already cached: ${modelPath}`);
          updateProgress(modelPath, true);
          return;
        }

        const model = await loaderManager.loadModel(modelPath, useCompression);
        modelCache.set(modelPath, model);
        updateProgress(modelPath, true);
      } catch (error) {
        console.error(`❌ Failed to load model ${modelPath}:`, error);
        updateProgress(modelPath, false);
      }
    });

    return () => {
      mounted = false;
      loaderManager.dispose();
    };
  }, [calculateProgress]);

  return {
    ...state,
    startLoading,
    resetLoading,
  };
};

/**
 * Хук для получения модели из кеша
 */
export const useModel = (modelPath: string): Object3D | null => {
  return modelCache.get(modelPath);
}; 