import { Box, Cylinder } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AlarmLightProps } from "./AlarmLight.props";

/**
 * Лампа аварийного света
 */
const AlarmLight: React.FC<AlarmLightProps> = ({ position, rotation = [0, 0, 0] }) => {
  const lightRef = useRef<any>(null);
  const glowRef = useRef<any>(null);
  const phaseOffset = useRef(Math.random() * 10); // Случайное смещение фазы для каждого света
  const speedVariation = useRef(0.8 + Math.random() * 0.4); // Случайная вариация скорости (0.8-1.2)

  // Анимация мерцания
  useFrame(({ clock }) => {
    if (lightRef.current && glowRef.current) {
      // Основная пульсация с нерегулярным характером
      const time = clock.getElapsedTime() * 5 * speedVariation.current + phaseOffset.current;
      let pulse = Math.sin(time) * 0.8 + 1.2; // Базовая пульсация (0.4-2.0)

      // Добавляем случайные вспышки и затухания
      if (Math.random() < 0.01) {
        // Редкие случайные вспышки
        pulse = 2.5 + Math.random() * 0.5; // Яркая вспышка (2.5-3.0)
      } else if (Math.random() < 0.005) {
        // Очень редкие затухания
        pulse = 0.2 + Math.random() * 0.3; // Почти затухание (0.2-0.5)
      }

      lightRef.current.intensity = pulse * 2; // Усиливаем точечный свет
      glowRef.current.intensity = pulse * 1.2; // Более мягкое свечение
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Крепление к стене */}
      <Box args={[0.1, 0.2, 0.15]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color='#444444' metalness={0.9} roughness={0.3} />
      </Box>

      {/* Металлический корпус светильника - повернут боком */}
      <Cylinder args={[0.2, 0.2, 0.1]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.05]}>
        <meshStandardMaterial
          color='#660000'
          metalness={0.9}
          roughness={0.2}
          emissive='#330000'
          emissiveIntensity={0.2}
        />
      </Cylinder>

      {/* Сильное точечное свечение в центре */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0.14]}
        intensity={4}
        distance={15}
        decay={1.5}
        color='#ff0000'
        castShadow
      />

      {/* Дополнительное мягкое свечение */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0.1]}
        intensity={1.5}
        distance={5}
        decay={2}
        color='#ff3333'
      />

      {/* Яркая светящаяся центральная часть */}
      <Cylinder args={[0.1, 0.1, 0.03]} position={[0, 0, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color='#ff5555' />
      </Cylinder>

      {/* Защитное стекло */}
      <Cylinder args={[0.15, 0.15, 0.02]} position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial
          color='#ff3333'
          transparent={true}
          opacity={0.6}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Cylinder>
    </group>
  );
};

export default AlarmLight;
