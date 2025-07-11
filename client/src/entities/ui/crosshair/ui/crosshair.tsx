import { FC, memo } from "react";
import styles from "./crosshair.module.scss";
import { CrosshairProps } from "../model/types";

export const Crosshair: FC<CrosshairProps> = memo(({ isHovered = false }) => {
  const dotClassName = isHovered
    ? `${styles.centerPosition__dot} ${styles.pulsing}`
    : styles.centerPosition__dot;

  return (
    <div className={styles.centerPosition}>
      <div className={dotClassName}></div>
      {isHovered && <div className={styles.interactionHint}>Взаимодействие</div>}
    </div>
  );
});
