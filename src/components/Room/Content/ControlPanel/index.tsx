import { Box, Text } from "@react-three/drei";
import { FC } from "react";
import { Vector3, Euler } from "three";
import { ControlPanelProps } from "./ControlPanel.props";

/**
 * Создание панели управления
 * @param position Позиция панели
 * @param rotation Угол поворота панели
 * @param handleObjectClick Открытие информации на панели
 */
const ControlPanel: FC<ControlPanelProps> = ({ position, rotation, handleObjectClick }) => (
  <group
    position={new Vector3(...position)}
    rotation={new Euler(...rotation)}
    onClick={(e) => {
      e.stopPropagation();
      handleObjectClick(
        "Панель управления",
        "Система мониторинга и управления оборудованием. Статус: Online. Последнее обновление: 2 мин назад",
        new Vector3(...position)
      );
    }}
    onPointerOver={(e) => {
      document.body.style.cursor = "pointer";
    }}
    onPointerOut={(e) => {
      document.body.style.cursor = "default";
    }}
  >
    {/* Корпус панели */}
    <Box args={[1.5, 1, 0.2]} material-color='#2a2a2a'>
      <meshStandardMaterial roughness={0.5} metalness={0.8} color='#333333' />
    </Box>

    {/* Текст на панели */}
    <Text position={[0, 0, 0.15]} fontSize={0.1} color='#00ff00'>
      CONTROL PANEL
    </Text>

    {/* Кнопки и индикаторы */}
    <Box args={[0.1, 0.1, 0.05]} position={[-0.4, 0.2, 0.15]} material-color='#ff0000' />
    <Box args={[0.1, 0.1, 0.05]} position={[-0.2, 0.2, 0.15]} material-color='#00ff00' />
    <Box args={[0.1, 0.1, 0.05]} position={[0, 0.2, 0.15]} material-color='#0000ff' />
  </group>
);

export default ControlPanel;
