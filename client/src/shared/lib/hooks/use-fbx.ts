import { useState, useEffect } from 'react';
import { Group } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export const useFBX = (path: string) => {
  const [scene, setScene] = useState<Group | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Если путь пустой или не FBX, возвращаем null
    if (!path || !path.toLowerCase().endsWith('.fbx')) {
      setScene(null);
      return;
    }

    const loader = new FBXLoader();
    
    loader.load(
      path,
      (fbx) => {
        setScene(fbx);
      },
      (xhr) => {
        console.log(`Loading FBX model ${path}: ${(xhr.loaded / xhr.total * 100)}% loaded`);
      },
      (err) => {
        console.error(`Error loading FBX model ${path}:`, err);
        setError(new Error(err instanceof Error ? err.message : String(err)));
      }
    );

    // Очистка при размонтировании
    return () => {
      setScene(null);
      setError(null);
    };
  }, [path]);

  if (error) {
    throw error;
  }

  return { scene };
}; 