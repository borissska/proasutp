import { FC } from "react";
import styles from "./Crosshair.module.scss";

// Компонент перекрестья в центре экрана
const Crosshair: FC = () => {
  return (
    <div className={styles.centerPosition}>
      <div className={styles.centerPosition__dot}></div>
    </div>
  );
};

export default Crosshair;
