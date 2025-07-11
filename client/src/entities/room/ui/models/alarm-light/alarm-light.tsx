import { FC, useRef } from "react";
import { Box, Cylinder } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AlarmLightProps } from "./alarm-light.props";

export const AlarmLight: FC<AlarmLightProps> = ({ position, rotation = [0, 0, 0] }) => {
  const lightRef = useRef<any>(null);
  const glowRef = useRef<any>(null);
  const phaseOffset = useRef(Math.random() * 10); // Случайное смещение фазы для каждого света
  const speedVariation = useRef(0.8 + Math.random() * 0.4); // Случайная вариация скорости (0.8-1.2)

  // Анимация плавного мерцания
  useFrame(({ clock }) => {
    if (lightRef.current && glowRef.current) {
      // Основная пульсация с нерегулярным характером
      const time = clock.getElapsedTime() * 5 * speedVariation.current + phaseOffset.current;
      const pulse = Math.sin(time) * 0.8 + 1.2; // Базовая пульсация (0.4-2.0)

      lightRef.current.intensity = pulse * 2; // Усиливаем точечный свет
      glowRef.current.intensity = pulse * 1.6; // Более мягкое свечение
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
