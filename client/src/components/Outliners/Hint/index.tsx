import { FC } from "react";
import styles from "./Hint.module.scss";


const Hint: FC = () => {
  return (
    <div className={styles.hint}>
      Для того, чтобы узнать о компании кликайте на подсвеченные зеленым цветом объекты
      <br />
      Перемещение: WASD | Информация: клик мыши
    </div>
  );
};

export default Hint;
