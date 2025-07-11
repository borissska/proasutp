import { FC, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { HoverProvider, useHover } from "../../../app/providers/HoverProvider";
import { Crosshair } from "../../../entities/ui/crosshair";
import { Hint } from "../../../entities/ui/hint";
import { LoadingBar } from "../../../entities/ui/loading-bar";
import { RoomError } from "../../../entities/room/ui/error/room-error";
import { RoomFallback } from "../../../entities/room/ui/fallback/room-fallback";
import { useLoading } from "../../../app/providers/LoadingProvider";
import { InteractiveElements } from "../components/interactive-elements";
import { SceneInitializer } from "../components/scene-initializer";
import styles from "./main-page.module.scss";

const MainPageContent: FC = () => {
  const { isComplete } = useLoading();
  const { isHovered } = useHover();

  return (
    <div className={styles.mainPage}>
      <LoadingBar />

      <Canvas
        className={styles.canvas}
        camera={{ fov: 75, near: 0.1, far: 10000 }}
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          depth: true,
          powerPreference: "high-performance",
        }}
      >
        <RoomError>
          <Suspense fallback={<RoomFallback />}>
            <SceneInitializer />
            <InteractiveElements />
          </Suspense>
        </RoomError>
      </Canvas>

      {/* UI-элементы показываем только после загрузки */}
      {isComplete && (
        <div className={styles.uiOverlay}>
          <Crosshair isHovered={isHovered} />
          <Hint />
        </div>
      )}
    </div>
  );
};

export const MainPage: FC = () => {
  return (
    <HoverProvider>
      <MainPageContent />
    </HoverProvider>
  );
};
