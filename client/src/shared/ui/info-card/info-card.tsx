import { FC } from "react";
import { Billboard, Html } from "@react-three/drei";
import { InfoCardProps } from "./info-card.props";
import styles from "./info-card.module.scss";

/**
 * Компонент информационной карточки
 * Отображает подробности об объекте при клике
 * Всегда поворачивается к камере (billboard)
 * Без резкого эффекта переворота при появлении
 */
export const InfoCard: FC<InfoCardProps> = ({ title, description, position, visible, width }) => {
  // Разбиваем описание на строки, если оно содержит \n
  const descriptionLines = description.split("\n");

  return (
    <Billboard position={position} follow={true}>
      <Html
        transform
        position={[0, 0, 0]}
        distanceFactor={5}
        zIndexRange={[999, 1000]}
        calculatePosition={() => [0, 0, 0]}
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <div className={styles.infoCard} style={{ width: width ? `${width}px` : undefined }}>
          <h3 className={styles.infoCard_title}>{title}</h3>

          <div className={styles.infoCard_container}>
            {descriptionLines.map((line, index) => {
              // Разбиваем строку на ключ и значение, если есть двоеточие
              const [key, ...valueParts] = line.includes(":") ? line.split(":") : [line, ""];
              const value = valueParts.join(":"); // Объединяем обратно для случаев, когда в значении есть двоеточие

              return (
                <div key={index} className={styles.infoCard_content}>
                  <span className={styles.infoCard_content__bold}>{key}</span>
                  {value && <span className={styles.infoCard_content__right}>{value.trim()}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </Html>
    </Billboard>
  );
};
