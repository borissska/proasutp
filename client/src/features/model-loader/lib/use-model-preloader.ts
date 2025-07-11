import { useEffect } from "react";
import { useLoading } from "../../../app/providers/LoadingProvider/ui/LoadingProvider";
import { MODEL_LOADER_CONFIG } from "../model/constants";

export const useModelPreloader = () => {
  const { startLoading, resetLoading } = useLoading();

  useEffect(() => {
    console.log('🔄 Starting optimized model preloader');
    
    // Сбрасываем прогресс загрузки
    resetLoading();
    
    // Начинаем загрузку без renderer (KTX2 поддержка не критична)
    startLoading({
      glbModels: MODEL_LOADER_CONFIG.glbModels,
      fbxModels: MODEL_LOADER_CONFIG.fbxModels
    }); // Убираем второй параметр gl

    return () => {
      resetLoading();
    };
  }, [startLoading, resetLoading]); // Убираем gl из зависимостей
}; 