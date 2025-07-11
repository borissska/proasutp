import { FC, memo } from "react";
import styles from "./hint.module.scss";

export const Hint: FC = memo(() => {
  return (
    <div className={styles.hint}>
      Для того, чтобы узнать о компании кликайте на подсвеченные зеленым цветом объекты
      <br />
      Перемещение: WASD | Информация: клик мыши
    </div>
  );
});
