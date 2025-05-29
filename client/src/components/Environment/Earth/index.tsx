import { useGLTF } from "@react-three/drei";
import { FC, useRef, useEffect } from "react";
import { EarthProps } from "./Earth.props";
import { useFrame } from "@react-three/fiber";

const Earth: FC<EarthProps> = ({ position, radius, rotationSpeed = 0.001 }) => {
  const groupRef = useRef<any>(null);

  // Загружаем GLB модель
  const { scene } = useGLTF("/Earth/Earth.glb");

  // Настройка начальной позиции и поворота модели
  useEffect(() => {
    if (groupRef.current && scene) {
      groupRef.current.position.copy(position);
      const scaleFactor = radius / 10;
      groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Настраиваем материалы
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // Настраиваем материалы для Земли
          if (child.material) {
            child.material.metalness = 0.1;
            child.material.roughness = 0.8;
          }
        }
      });
    }
  }, [scene, position, radius]);

  // Медленное вращение планеты
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

export default Earth;