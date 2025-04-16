import { FC } from "react";
import { BackSide } from "three";
import { SpaceProps } from "./Sapce.props";

const Space: FC<SpaceProps> = ({ color }) => {
  return (
    <mesh>
      <sphereGeometry args={[1900, 64, 64]} />
      <meshBasicMaterial color={color} fog={false} side={BackSide} />
    </mesh>
  );
};

export default Space;
