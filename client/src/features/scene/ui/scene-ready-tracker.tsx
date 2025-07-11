import { FC, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useSceneReady } from "../../../shared/lib/hooks/use-scene-ready";
import { useLoadingInternal } from "../../../app/providers/LoadingProvider/ui/LoadingProvider";

/**
 * Компонент для отслеживания готовности сцены к показу
 * Должен быть размещен внутри Canvas
 */
export const SceneReadyTracker: FC = () => {
  const isSceneReady = useSceneReady();
  const { _setSceneReady } = useLoadingInternal();
  const { gl, scene, camera } = useThree();
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Принудительное завершение через максимальное время
  useEffect(() => {
    fallbackTimerRef.current = setTimeout(() => {
      console.log("⏰ Fallback timer: forcing scene ready");
      _setSceneReady(true);
    }, 5000); // Максимум 5 секунд на подготовку сцены

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
    };
  }, [_setSceneReady]);

  // Прогрев рендерера
  useEffect(() => {
    const warmupRender = () => {
      try {
        if (gl && scene && camera) {
          gl.render(scene, camera);
          console.log("🔥 Renderer warmed up");
        }
      } catch (error) {
        console.warn("Could not warm up renderer:", error);
      }
    };

    const timeoutId = setTimeout(warmupRender, 100);
    return () => clearTimeout(timeoutId);
  }, [gl, scene, camera]);

  useEffect(() => {
    if (isSceneReady && fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }
    _setSceneReady(isSceneReady);
  }, [isSceneReady, _setSceneReady]);

  return null;
};
