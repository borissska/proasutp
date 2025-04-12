import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Vector2 } from "three";
import RoomSpace from "./Content";

// CSS стили для курсора, который всегда отображается в центре экрана
const centerDotStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  zIndex: 1000,
};

// Информационное сообщение
const infoStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "10px 15px",
  borderRadius: "5px",
  fontSize: "14px",
  zIndex: 1000,
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
};

// Компонент перекрестья в центре экрана
const Crosshair = () => {
  return (
    <div style={centerDotStyle}>
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

const Room: React.FC = () => {
  // В этой реализации мы не используем mouse и handleMouseMove
  // для обнаружения наведения, так как используем центр экрана

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Crosshair />
      <div style={infoStyle}>
        Для того, чтобы узнать о компании кликайте на подсвеченные зеленым цветом объекты
        <br />
        Перемещение: WASD | Информация: клик мыши
      </div>
      <Canvas
        style={{ height: "100vh" }}
        camera={{
          position: [0, 1, 5],
          fov: 90, 
        }}
      >
        <RoomSpace />
      </Canvas>
    </div>
  );
};

export default Room;
