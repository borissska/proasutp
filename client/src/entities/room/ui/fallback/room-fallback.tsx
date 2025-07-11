import { FC } from "react";
import { Text } from "@react-three/drei";
import { Color } from "three";

export const RoomFallback: FC = () => {
  return (
    <Text
      color={new Color(0xffffff)}
      fontSize={0.5}
      maxWidth={2}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign='center'
      anchorX='center'
      anchorY='middle'
      position={[0, 1.5, 0]}
    >
      Загрузка 3D сцены...
    </Text>
  );
};
