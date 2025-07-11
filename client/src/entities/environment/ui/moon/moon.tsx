import { FC, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { Position3D, toVector3 } from "../../../../shared/types/three";
import { ENVIRONMENT_CONFIG, MODEL_PATHS } from "../../model/constants";

interface MoonProps {
  centerPos?: Position3D;
  orbitRadius?: number;
  rotationSpeed?: number;
  orbitSpeed?: number;
  radius?: number;
}

export const Moon = ({
  centerPos = ENVIRONMENT_CONFIG.EARTH.POSITION,
  orbitRadius = ENVIRONMENT_CONFIG.MOON.ORBIT_RADIUS,
  rotationSpeed = ENVIRONMENT_CONFIG.MOON.ROTATION_SPEED,
  orbitSpeed = ENVIRONMENT_CONFIG.MOON.ORBIT_SPEED,
  radius = ENVIRONMENT_CONFIG.MOON.RADIUS ,
}: MoonProps) => {
  const moonGroup = useRef<Group>(null);
  const orbitGroup = useRef<Group>(null);
  const startAngle = useRef(Math.random() * Math.PI * 2);
  const center = toVector3(centerPos);

  // Загружаем GLB модель
  const { scene } = useGLTF(MODEL_PATHS.MOON);

  useFrame(({ clock }) => {
    if (!moonGroup.current || !orbitGroup.current) return;

    // Вращение вокруг своей оси
    moonGroup.current.rotation.y += rotationSpeed;

    // Орбитальное движение вокруг планеты
    const time = clock.getElapsedTime();
    const angle = startAngle.current + time * orbitSpeed;

    // Вычисляем новую позицию на орбите с эллиптической траекторией
    orbitGroup.current.position.x = center.x + Math.cos(angle) * orbitRadius;
    orbitGroup.current.position.y = center.y + Math.sin(angle) * orbitRadius * 0.2;
    orbitGroup.current.position.z = center.z + Math.sin(angle) * orbitRadius;
  });

  return (
    <group ref={orbitGroup}>
      <group ref={moonGroup}>
        <primitive object={scene.clone()} scale={radius} />
      </group>
    </group>
  );
};
