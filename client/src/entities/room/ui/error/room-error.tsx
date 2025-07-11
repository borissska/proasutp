import { FC, ReactNode } from "react";
import { Text } from "@react-three/drei";
import { Color } from "three";

interface RoomErrorProps {
  children?: ReactNode;
}

export const RoomError: FC<RoomErrorProps> = ({ children }) => {
  if (!children) {
    return (
      <Text
        color={new Color(0xff0000)}
        fontSize={0.5}
        maxWidth={2}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign='center'
        anchorX='center'
        anchorY='middle'
        position={[0, 1.5, 0]}
      >
        Ошибка загрузки 3D сцены
      </Text>
    );
  }

  return <>{children}</>;
};
