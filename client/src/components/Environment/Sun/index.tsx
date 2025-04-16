import { useFrame } from '@react-three/fiber';
import { FC, useRef } from 'react'
import { Vector3, Mesh } from 'three';

/**
 * Компонент солнца
 * Создает яркое светящееся солнце с эффектом свечения и короны
 */
const Sun: FC<{
    position: Vector3;
    radius: number;
  }> = ({ position, radius }) => {
    const sunRef = useRef<Mesh>(null);
    const coronaRef = useRef<Mesh>(null);
    const lightRef = useRef<any>(null);
    
    // Быстрое вращение солнца и пульсация света
    useFrame(({ clock }) => {
      if (sunRef.current) {
        // Увеличенная скорость вращения
        sunRef.current.rotation.y += 0.003;
        sunRef.current.rotation.x += 0.001;
        
        // Пульсация размера и яркости
        const elapsedTime = clock.getElapsedTime();
        const pulseFactor = Math.sin(elapsedTime * 0.99) * 0.005 + 1; // Основная пульсация
        sunRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
        
        // Анимация короны солнца
        if (coronaRef.current) {
          const coronaPulseFactor = Math.sin(elapsedTime * 0.3) * 0.15 + 1.35; // Медленная пульсация короны
          coronaRef.current.scale.set(coronaPulseFactor, coronaPulseFactor, coronaPulseFactor);
          coronaRef.current.rotation.z += 0.001; // Медленное вращение короны
          coronaRef.current.rotation.y -= 0.0005;
        }
        
        // Изменение интенсивности света
        if (lightRef.current) {
          lightRef.current.intensity = 8 + Math.sin(elapsedTime * 1.2) * 2; // Пульсация света
        }
      }
    });
    
    return (
      <group>
        {/* Ядро солнца */}
        <mesh ref={sunRef} position={position}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial color="#FDB813" />
        </mesh>
        
        {/* Внутреннее свечение */}
        <mesh position={position}>
          <sphereGeometry args={[radius * 1.2, 32, 32]} />
          <meshBasicMaterial color="#FF9900" transparent opacity={0.4} />
        </mesh>
        
        {/* Внешняя корона */}
        <mesh ref={coronaRef} position={position}>
          <sphereGeometry args={[radius * 1.8, 32, 32]} />
          <meshBasicMaterial color="#FF5500" transparent opacity={0.15} depthWrite={false} />
        </mesh>
        
        {/* Дальнее свечение */}
        <mesh position={position}>
          <sphereGeometry args={[radius * 3, 32, 32]} />
          <meshBasicMaterial color="#FFDD00" transparent opacity={0.05} depthWrite={false} />
        </mesh>
        
        {/* Направленное освещение только снаружи комнаты (для планет) */}
        <directionalLight 
          position={position}
          intensity={1} 
          castShadow={true}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={1500}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
          shadow-bias={-0.0005}
        />
        
        {/* Яркий точечный свет только для самого солнца */}
        <pointLight 
          ref={lightRef} 
          position={position} 
          intensity={8} 
          distance={800} 
          decay={2.5} 
          color="#FFF8E7" 
        />
      </group>
    );
  };

  export default Sun;
