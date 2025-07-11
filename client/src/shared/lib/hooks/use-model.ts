import { useState, useEffect } from 'react';
import { Object3D } from 'three';
import { modelCache } from '../model-loading';

/**
 * Хук для получения загруженной модели из кеша
 * @param path Путь к модели
 * @returns Клон модели или null если модель не загружена
 */
export const useModel = (path: string): Object3D | null => {
  const [model, setModel] = useState<Object3D | null>(null);

  useEffect(() => {
    if (!path) {
      setModel(null);
      return;
    }

    // Пытаемся получить модель из кеша
    const cachedModel = modelCache.get(path);
    setModel(cachedModel);

    // Если модель не найдена, можно подписаться на обновления кеша
    // или просто вернуть null - компонент перерендерится когда модель загрузится
    if (!cachedModel) {
      // Проверяем кеш периодически (для случаев когда модель загружается)
      const interval = setInterval(() => {
        const freshModel = modelCache.get(path);
        if (freshModel) {
          setModel(freshModel);
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [path]);

  return model;
}; 