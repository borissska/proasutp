import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import Crosshair from "../../components/Outliners/Crosshair";
import Hint from "../../components/Outliners/Hint";
import styles from "./MainPage.module.scss";
import Logic from "../../features/Logic";

const MainPage: FC = () => {
  return (
    <div className={styles.mainPage}>
      <Crosshair />
      <Hint />
      <Canvas
        className={styles.canvas}
        camera={{
          fov: 90, 
        }}
      >
        <Logic />
      </Canvas>
    </div>
  );
};

export default MainPage;