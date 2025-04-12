import { useLoader, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MoonProps } from "./Moon.props";

/**
 * Компонент луны, вращающейся вокруг планеты
 */
const Moon: React.FC<MoonProps> = ({
  centerPosition,
  orbitRadius,
  radius,
  rotationSpeed = 0.001,
  orbitSpeed = 0.0003,
}) => {
  const moonGroup = useRef<any>(null);
  const orbitGroup = useRef<any>(null);

  // Загрузка материалов и модели - исправленные пути
  const materials = useLoader(MTLLoader, "/Moon/Moon.mtl");
  const obj = useLoader(OBJLoader, "/Moon/Moon.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // Случайная начальная позиция на орбите
  const startAngle = useRef(Math.random() * Math.PI * 2);

  // Настройка модели при первом рендере
  useEffect(() => {
    if (obj && moonGroup.current) {
      // Модель луны может нуждаться в дополнительном масштабировании
      // в зависимости от фактического размера модели
      const scaleFactor = radius / 250; // Уменьшаем знаменатель для увеличения модели

      moonGroup.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Возможно, потребуется дополнительная коррекция позиции или поворота
      obj.rotation.set(0, 0, 0);
      obj.position.set(0, 0, 0);

      console.log("Луна загружена:", obj);
    }
  }, [obj, radius]);

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
      orbitGroup.current.position.y = centerPosition.y + Math.sin(angle) * orbitRadius * 0.2; // Эллиптическая орбита
      orbitGroup.current.position.z = centerPosition.z + Math.sin(angle) * orbitRadius;
    }
  });

  return (
    <group ref={orbitGroup}>
      <group ref={moonGroup}>
        <primitive object={obj.clone()} />
      </group>
    </group>
  );
};

export default Moon;
