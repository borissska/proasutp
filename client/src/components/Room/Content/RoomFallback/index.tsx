import { FC } from "react";

// Фоллбэк в случае, если модель не загрузится
const RoomFallback: FC = () => {
  return (
    <>
      {/* Пол */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[8, 0.5, 30]} />
        <meshStandardMaterial color='#555555' roughness={0.8} transparent={false} opacity={1.0} />
      </mesh>

      {/* Потолок */}
      <mesh position={[0, 8, 0]} receiveShadow>
        <boxGeometry args={[8, 0.5, 30]} />
        <meshStandardMaterial color='#555555' roughness={0.8} transparent={false} opacity={1.0} />
      </mesh>

      {/* Стены */}
      <mesh position={[-4, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 10, 30]} />
        <meshStandardMaterial color='#555555' roughness={0.6} transparent={false} opacity={1.0} />
      </mesh>

      <mesh position={[4, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 10, 30]} />
        <meshStandardMaterial color='#555555' roughness={0.6} transparent={false} opacity={1.0} />
      </mesh>

      <mesh position={[0, 3, 15]} castShadow receiveShadow>
        <boxGeometry args={[8, 10, 0.2]} />
        <meshStandardMaterial color='#555555' roughness={0.6} transparent={false} opacity={1.0} />
      </mesh>

      <mesh position={[0, 3, -15]} castShadow receiveShadow>
        <boxGeometry args={[8, 10, 0.2]} />
        <meshStandardMaterial color='#555555' roughness={0.6} transparent={false} opacity={1.0} />
      </mesh>
    </>
  );
};

export default RoomFallback;
