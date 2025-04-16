import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, BufferAttribute, Points, AdditiveBlending } from "three";
import { StarsProps } from "./Stars.props";

/**
 * Компонент далеких звезд с эффектом мерцания
 * Создает эффект звездного неба
 */
const Stars: React.FC<StarsProps> = ({ count }) => {
  const starsRef = useRef<Points>(null);

  // Создаем набор координат для звезд
  const positions = React.useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      // Генерируем случайные координаты равномерно по сфере
      const phi = Math.acos(2 * Math.random() - 1); // от 0 до PI
      const theta = Math.random() * Math.PI * 2; // от 0 до 2*PI

      // Радиус между 800 и 1500 для разной глубины звёзд
      const radius = 800 + Math.random() * 700;

      // Конвертируем сферические координаты в декартовы
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, [count]);

  // Создаем размеры звезд
  const sizes = React.useMemo(() => {
    const sizes = [];
    for (let i = 0; i < count; i++) {
      sizes.push(Math.random() * 2 + 0.5); // Размеры от 0.5 до 2.5
    }
    return new Float32Array(sizes);
  }, [count]);

  // Создаем скорости мерцания для звезд
  const twinkleSpeed = React.useMemo(() => {
    const speeds = [];
    for (let i = 0; i < count; i++) {
      speeds.push(Math.random() * 0.8 + 0.3); // Медленное мерцание (от 0.3 до 1.1)
    }
    return new Float32Array(speeds);
  }, [count]);

  // Создаем начальные фазы мерцания для звезд
  const twinklePhase = React.useMemo(() => {
    const phases = [];
    for (let i = 0; i < count; i++) {
      phases.push(Math.random() * Math.PI * 2); // Разные начальные фазы
    }
    return new Float32Array(phases);
  }, [count]);

  // Вращение звездного неба и обновление времени для шейдера
  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.00001; // Очень медленное вращение

      // Обновляем время для шейдера
      const material = starsRef.current.material as any;
      if (material.uniforms) {
        material.uniforms.time.value = clock.getElapsedTime();
      }
    }
  });

  // Создаем геометрию с буферными атрибутами
  const geometry = React.useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("size", new BufferAttribute(sizes, 1));
    geometry.setAttribute("twinkleSpeed", new BufferAttribute(twinkleSpeed, 1));
    geometry.setAttribute("twinklePhase", new BufferAttribute(twinklePhase, 1));
    return geometry;
  }, [positions, sizes, twinkleSpeed, twinklePhase]);

  // Вертексный шейдер для мерцания звезд
  const vertexShader = `
    attribute float size;
    attribute float twinkleSpeed;
    attribute float twinklePhase;
    varying float vBrightness;
    uniform float time;
    
    void main() {
      vBrightness = 0.5 + 0.5 * sin(time * twinkleSpeed + twinklePhase);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      gl_PointSize = size * (300.0 / length(mvPosition.xyz)) * (0.8 + 0.2 * vBrightness);
    }
  `;

  // Фрагментный шейдер для мерцания звезд
  const fragmentShader = `
    varying float vBrightness;
    
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5, 0.5));
      if (dist > 0.5) discard; // Круглые точки
      
      gl_FragColor = vec4(0.8 + 0.2 * vBrightness, 0.8 + 0.2 * vBrightness, 1.0, vBrightness);
    }
  `;

  return (
    <points ref={starsRef}>
      <bufferGeometry attach='geometry' {...geometry} />
      <shaderMaterial
        attach='material'
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        blending={AdditiveBlending}
        uniforms={{
          time: { value: 0.0 },
        }}
        depthWrite={false}
      />
    </points>
  );
};

export default Stars;
