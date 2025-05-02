import { FC, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Crosshair from "../../components/Outliners/Crosshair";
import Hint from "../../components/Outliners/Hint";
import styles from "./MainPage.module.scss";
import Logic from "../../features/Logic";
import { HoverProvider, useHover } from "../../context/HoverContext";

// Компонент, который получает состояние из контекста и передает в Crosshair
const CrosshairWithHover: FC = () => {
  const { isHovered } = useHover();
  return <Crosshair isHovered={isHovered} />;
};

// Компонент безопасности для контроля залипания состояния
const HoverSafetyControl: FC = () => {
  const { resetHoverState } = useHover();

  useEffect(() => {
    // Простая реализация: сбрасываем состояние только при потере фокуса окном
    // и выходе курсора за пределы документа

    const handleVisibilityChange = () => {
      if (document.hidden) {
        resetHoverState();
      }
    };

    // События для проверки залипания
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("mouseleave", resetHoverState);
    window.addEventListener("blur", resetHoverState);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("mouseleave", resetHoverState);
      window.removeEventListener("blur", resetHoverState);
    };
  }, [resetHoverState]);

  return null;
};

const MainPage: FC = () => {
  // Функция для отладки WebGL
  useEffect(() => {
    console.log("Three.js renderer checking...");
    const canvas = document.querySelector("canvas");
    if (canvas) {
      console.log("Canvas found:", canvas);
      console.log("Canvas dimensions:", canvas.width, canvas.height);
    } else {
      console.error("Canvas not found!");
    }

    // Добавляем атрибут к body для предотвращения hover эффектов на мобильных устройствах
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.body.setAttribute("data-touch-device", "true");
    }
  }, []);

  return (
    <HoverProvider>
      <div className={styles.mainPage}>
        <Canvas
          className={styles.canvas}
          camera={{
            fov: 90,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            antialias: true,
            alpha: false,
            stencil: false,
            depth: true,
            powerPreference: "high-performance",
          }}
        >
          <Logic />
        </Canvas>

        {/* UI-элементы поверх канваса */}
        <div className={styles.uiOverlay}>
          <CrosshairWithHover />
          <Hint />
        </div>

        {/* Компонент для защиты от залипания hover */}
        <HoverSafetyControl />
      </div>
    </HoverProvider>
  );
};

export default MainPage;
