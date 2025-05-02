import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  useCallback,
} from "react";

interface HoverContextType {
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  resetHoverState: () => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export const useHover = (): HoverContextType => {
  const context = useContext(HoverContext);
  if (!context) {
    throw new Error("useHover must be used within a HoverProvider");
  }
  return context;
};

interface HoverProviderProps {
  children: ReactNode;
}

export const HoverProvider: React.FC<HoverProviderProps> = ({ children }) => {
  const [isHovered, setIsHoveredState] = useState(false);
  const lastMoveTimeRef = useRef(Date.now());
  const cursorPositionRef = useRef({ x: 0, y: 0 });

  // Явный сброс состояния
  const resetHoverState = useCallback(() => {
    setIsHoveredState(false);
  }, []);

  // Установка состояния
  const setIsHovered = useCallback((newState: boolean) => {
    // Устанавливаем новое состояние
    setIsHoveredState(newState);

    // Обновляем время последнего действия, только если включаем состояние
    if (newState) {
      lastMoveTimeRef.current = Date.now();
    }
  }, []);

  // Глобальные обработчики событий для защиты от залипания при быстром перемещении курсора
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Обновляем время последнего движения
      lastMoveTimeRef.current = Date.now();

      // Сохраняем позицию курсора
      cursorPositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => resetHoverState();

    // Устанавливаем обработчики
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      // Очистка обработчиков
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [resetHoverState]);

  // Эффект для проверки состояния при каждом рендере
  useEffect(() => {
    // Если состояние включено, добавляем класс к body
    if (isHovered) {
      document.body.classList.add("hover-active");
    } else {
      document.body.classList.remove("hover-active");
    }
  }, [isHovered]);

  return (
    <HoverContext.Provider
      value={{
        isHovered,
        setIsHovered,
        resetHoverState,
      }}
    >
      {children}
    </HoverContext.Provider>
  );
};
