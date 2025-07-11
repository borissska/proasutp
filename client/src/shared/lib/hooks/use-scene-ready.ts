import { useState, useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Object3D, Mesh } from 'three';

/**
 * Упрощенный хук для проверки готовности сцены
 */
export const useSceneReady = () => {
  const [isReady, setIsReady] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { scene } = useThree();
  
  // Считаем кадры
  useFrame(() => {
    if (!isReady && frameCount < 20) {
      setFrameCount(prev => prev + 1);
    }
  });

  useEffect(() => {
    // Очищаем предыдущий таймер
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    // Запускаем проверку через короткую задержку
    checkTimeoutRef.current = setTimeout(() => {
      checkSceneReadiness();
    }, 300);

    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [frameCount, scene.children.length]); // Добавляем зависимость от children

  const checkSceneReadiness = () => {
    try {
      const meshCount = countValidMeshes(scene);
      const hasMinFrames = frameCount >= 8;
      const hasMinMeshes = meshCount >= 3;
      
      // DEBUG: детальная информация
      console.log(`🔍 Scene check detailed:`, {
        meshCount,
        frameCount,
        hasMinFrames,
        hasMinMeshes,
        sceneChildren: scene.children.length,
        ready: hasMinMeshes && hasMinFrames
      });
      
      if (hasMinMeshes && hasMinFrames) {
        console.log('✅ Scene is ready!');
        setIsReady(true);
      } else if (frameCount >= 30) {
        console.log('⚠️ Forcing scene ready after 30 frames');
        setIsReady(true);
      } else {
        checkTimeoutRef.current = setTimeout(checkSceneReadiness, 200);
      }
    } catch (error) {
      console.error('Error in scene readiness check:', error);
      setIsReady(true);
    }
  };

  const countValidMeshes = (object: Object3D): number => {
    let count = 0;
    
    object.traverse((child) => {
      if (child instanceof Mesh && 
          child.visible && 
          child.geometry && 
          child.material &&
          child.geometry.attributes &&
          child.geometry.attributes.position) {
        count++;
      }
    });
    
    return count;
  };

  return isReady;
}; 