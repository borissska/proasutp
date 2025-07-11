import { FC, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { EarthProps } from "../../model/types";
import { ENVIRONMENT_CONFIG, MODEL_PATHS } from "../../model/constants";

export const Earth: FC<EarthProps> = ({
  position = ENVIRONMENT_CONFIG.EARTH.POSITION,
  rotation = [0, 0, 0] as [number, number, number],
  scale = ENVIRONMENT_CONFIG.EARTH.RADIUS,
  autoRotate = true,
}) => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATHS.EARTH);

  // Медленное вращение планеты
  useFrame(() => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += ENVIRONMENT_CONFIG.EARTH.ROTATION_SPEED;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} scale={scale} />
    </group>
  );
};
