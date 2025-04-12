import { Vector3 } from 'three';
import DistantStars from './Stars';
import Sun from './Sun';
import Moon from './Moon';
import Earth from './Earth';
import { FC } from 'react';
import Space from './Space';

/**
 * Основной компонент космического окружения
 * Объединяет солнце, планеты и звезды
 */
const Environment: FC = () => {
  // Позиция солнца вдалеке
  const sunPosition = new Vector3(500, 100, -500);
  
  // Позиции планет - изменена позиция Земли
  const earthPosition = new Vector3(100, 0, 50);
  
  return (
    <group>
      <Space color="#010a20" />
      
      {/* Далекие звезды по всей космической сфере */}
      <DistantStars count={7000} />
      
      {/* Солнце с улучшенными эффектами */}
      <Sun position={sunPosition} radius={15} />
      
      {/* Планеты с быстрым вращением */}
      <Earth 
        position={earthPosition} 
        radius={9} 
        rotationSpeed={0.0008} 
      />
      
      {/* Луна, вращающаяся вокруг Земли */}
      <Moon 
        centerPosition={earthPosition}
        orbitRadius={30}
        radius={10} 
        rotationSpeed={0.0015}
        orbitSpeed={0.001} 
      />
    </group>
  );
};

export default Environment; 