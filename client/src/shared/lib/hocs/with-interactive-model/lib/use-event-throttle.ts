import { useRef } from 'react';

/**
 * Хук для оптимизации частоты вызова событий
 * @param throttleTime Время между событиями в мс
 * @returns Функция для проверки возможности обработки события
 */
export const useEventThrottle = (throttleTime: number = 80) => {
  const lastEventTimeRef = useRef(0);

  return () => {
    const now = Date.now();
    if (now - lastEventTimeRef.current >= throttleTime) {
      lastEventTimeRef.current = now;
      return true;
    }
    return false;
  };
}; 