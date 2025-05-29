import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { MoonProps } from "./Moon.props";
import { useFrame } from "@react-three/fiber";

const Moon: React.FC<MoonProps> = ({
  centerPosition,
  orbitRadius,
  radius,
  rotationSpeed = 0.001,
  orbitSpeed = 0.0003,
}) => {
  const moonGroup = useRef<any>(null);
  const orbitGroup = useRef<any>(null);

  // Загружаем GLB модель
  const { scene } = useGLTF("/Moon/Moon.glb");

  // Случайная начальная позиция на орбите
  const startAngle = useRef(Math.random() * Math.PI * 2);

  // Настройка модели при первом рендере
  useEffect(() => {
    if (scene && moonGroup.current) {
      // Уменьшаем масштаб для Луны
      const scaleFactor = radius / 50;
      moonGroup.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Настраиваем материалы
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // Добавляем металлический блеск для Луны
          if (child.material) {
            child.material.metalness = 0.3;
            child.material.roughness = 0.7;
          }
        }
      });

      console.log("Луна загружена:", scene);
    }
  }, [scene, radius]);

  // Вращение луны вокруг своей оси и вокруг планеты
  useFrame(({ clock }) => {
    // Вращение вокруг своей оси
    if (moonGroup.current) {
      moonGroup.current.rotation.y += rotationSpeed;
    }

    // Орбитальное движение вокруг планеты
    if (orbitGroup.current) {
      const time = clock.getElapsedTime();
      const angle = startAngle.current + time * orbitSpeed;

      orbitGroup.current.position.x = centerPosition.x + Math.cos(angle) * orbitRadius;
      orbitGroup.current.position.y = centerPosition.y + Math.sin(angle) * orbitRadius * 0.2;
      orbitGroup.current.position.z = centerPosition.z + Math.sin(angle) * orbitRadius;
    }
  });

  return (
    <group ref={orbitGroup}>
      <group ref={moonGroup}>
        <primitive object={scene.clone()} />
      </group>
    </group>
  );
};

export default Moon;