import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
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

  // Явный сброс состояния
  const resetHoverState = useCallback(() => {
    setIsHoveredState(false);
  }, []);

  // Установка состояния
  const setIsHovered = useCallback((newState: boolean) => {
    setIsHoveredState(newState);
  }, []);

  // Эффект для изменения классов в DOM
  useEffect(() => {
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
