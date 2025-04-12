import { Billboard, Html } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import { InfoCardProps } from "./InfoCard.props";

/**
 * Компонент информационной карточки
 * Отображает подробности об объекте при клике
 * Всегда поворачивается к камере (billboard)
 */
const InfoCard: React.FC<InfoCardProps> = ({ title, description, position, visible }) => {
  const billboardRef = useRef<Group>(null);

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
          style={{
            background: "rgba(0,0,0,0.9)",
            padding: "10px",
            borderRadius: "4px",
            color: "#00ff00",
            fontFamily: "monospace",
            width: "160px",
            border: "1px solid #00ff00",
            boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)",
            pointerEvents: "none",
            overflow: "hidden",
            textRendering: "geometricPrecision",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          <h3
            style={{
              margin: "0 0 8px 0",
              color: "#00ff00",
              borderBottom: "1px solid #00ff00",
              paddingBottom: "4px",
              fontSize: "14px",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </h3>

          <div style={{ fontSize: "12px" }}>
            {descriptionLines.map((line, index) => {
              // Разбиваем строку на ключ и значение, если есть двоеточие
              const [key, value] = line.includes(":") ? line.split(":") : [line, ""];
              return (
                <div
                  key={index}
                  style={{
                    margin: "4px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    lineHeight: "1.4",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{key}</span>
                  {value && (
                    <span
                      style={{
                        color: "#ffffff",
                        marginLeft: "8px",
                        textAlign: "right",
                        flexGrow: 1,
                      }}
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
