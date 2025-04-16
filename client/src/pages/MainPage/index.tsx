import { FC, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Crosshair from "../../components/Outliners/Crosshair";
import Hint from "../../components/Outliners/Hint";
import styles from "./MainPage.module.scss";
import Logic from "../../features/Logic";

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
  }, []);

  return (
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
        <Crosshair />
        <Hint />
      </div>
    </div>
  );
};

export default MainPage;
