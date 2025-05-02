import { FC } from "react";
import styles from "./Crosshair.module.scss";

interface CrosshairProps {
  isHovered?: boolean;
}

// Компонент перекрестья в центре экрана
const Crosshair: FC<CrosshairProps> = ({ isHovered = false }) => {
  // Упрощенная версия без локальных состояний и таймеров
  return (
    <div className={styles.centerPosition}>
      <div className={`${styles.centerPosition__dot} ${isHovered ? styles.pulsing : ""}`}></div>
      {isHovered && <div className={styles.interactionHint}>Взаимодействие</div>}
    </div>
  );
};

export default Crosshair;
