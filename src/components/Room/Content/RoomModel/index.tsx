import { useFBX } from "@react-three/drei";
import { FC, useEffect, useRef } from "react";

useFBX.preload("./Room/Space.fbx");

const RoomModel: FC = () => {
  const groupRef = useRef<any>(null);

  // Путь к FBX файлу и загрузка модели с помощью хука useFBX
  const roomModel = useFBX("./Room/Space.fbx");

  // Настройка модели после загрузки
  useEffect(() => {
    if (groupRef.current && roomModel) {
      console.log("FBX модель комнаты успешно загружена");

      // Настройка модели
      roomModel.rotation.set(0, 0, 0);
      roomModel.position.set(0, 0, 0);
      roomModel.scale.set(0.0045, 0.0045, 0.0045); // Меньший масштаб для FBX
    }
  }, [roomModel]);

  return (
    <group ref={groupRef}>
      <primitive object={roomModel} />
    </group>
  );
};

export default RoomModel;
