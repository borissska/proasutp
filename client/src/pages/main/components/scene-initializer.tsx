import { FC } from "react";
import { Environment } from "../../../entities/environment";
import { Room } from "../../../entities/room/ui/room";
import { useModelPreloader } from "../../../features/model-loader";

export const SceneInitializer: FC = () => {
  useModelPreloader();

  return (
    <>
      {/* RoomModel теперь сам отслеживает готовность сцены */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 2, 0]} intensity={0.7} distance={10} decay={2} />
      <Environment />
      <Room />
    </>
  );
};
