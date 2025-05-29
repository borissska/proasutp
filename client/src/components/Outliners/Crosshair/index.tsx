import { FC, memo } from "react";
import styles from "./Crosshair.module.scss";

interface CrosshairProps {
  isHovered?: boolean;
}

// Компонент перекрестья в центре экрана
const Crosshair: FC<CrosshairProps> = ({ isHovered = false }) => {
  // Оптимизированная версия без локальных состояний и эффектов
  const dotClassName = isHovered
    ? `${styles.centerPosition__dot} ${styles.pulsing}`
    : styles.centerPosition__dot;

  return (
    <div className={styles.centerPosition}>
      <div className={dotClassName}></div>
      {isHovered && <div className={styles.interactionHint}>Взаимодействие</div>}
    </div>
  );
};

// Используем memo для предотвращения ненужных перерендеров
export default memo(Crosshair);
