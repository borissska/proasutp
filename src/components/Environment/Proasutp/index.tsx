import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Vector3, Mesh } from "three";

/**
 * Компонент планеты
 * Создает вращающуюся планету с Logo Proasutp
 */
const Proasutp: FC<{
  position: Vector3;
  radius: number;
  textureColor: string;
  rotationSpeed?: number;
  name: string;
}> = ({ position, radius, textureColor, rotationSpeed = 0.001, name }) => {
  const planetRef = useRef<Mesh>(null);

  // Медленное вращение планеты
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={planetRef} position={position} name={name}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={textureColor} roughness={0.7} metalness={0.2} />
    </mesh>
  );
};

export default Proasutp;
