import { Billboard, Html } from "@react-three/drei";
import { InfoCardProps } from "./InfoCard.props";
import styles from "./InfoCard.module.scss";

/**
 * Компонент информационной карточки
 * Отображает подробности об объекте при клике
 * Всегда поворачивается к камере (billboard)
 */
const InfoCard: React.FC<InfoCardProps> = ({ title, description, position, visible }) => {
  if (!visible) {
    return null;
  }

  // Разбиваем описание на строки, если оно содержит \n
  const descriptionLines = description.split("\n");

  return (
    <Billboard position={position}>
      <Html
        transform
        position={[0, 0, 0]}
        distanceFactor={5}
        zIndexRange={[999, 1000]}
        calculatePosition={() => [0, 0, 0]}
      >
        <div
          className={styles.infoCard}
        >
          <h3
            className={styles.infoCard_title}
          >
            {title}
          </h3>

          <div className={styles.infoCard_content}>
            {descriptionLines.map((line, index) => {
              // Разбиваем строку на ключ и значение, если есть двоеточие
              const [key, value] = line.includes(":") ? line.split(":") : [line, ""];
              return (
                <div
                  key={index}
                  className={styles.infoCard_content}
                >
                  <span className={styles.infoCard_content__bold}>{key}</span>
                  {value && (
                    <span
                      className={styles.infoCard_content__bold}
                    >
                      {value}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Html>
    </Billboard>
  );
};

export default InfoCard;
