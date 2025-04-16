import { FC } from "react";
import styles from "./Crosshair.module.scss";

// Компонент перекрестья в центре экрана
const Crosshair: FC = () => {
    return (
      <div className={styles.centerDot}>
        {/* Центральная точка */}
        <div
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: "white",
            borderRadius: "50%",
            position: "absolute",
          }}
        ></div>
      </div>
    );
  };

  export default Crosshair;