import { FC } from "react";
import { BackSide } from "three";
import { SpaceProps } from "../../model/types";
import { ENVIRONMENT_CONFIG } from "../../model/constants";

export const Space: FC<SpaceProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = ENVIRONMENT_CONFIG.SPACE_COLOR,
}) => {
  return (
    <mesh position={position} rotation={rotation}>
      <sphereGeometry args={ENVIRONMENT_CONFIG.SPACE_GEOMETRY_ARGS} />
      <meshBasicMaterial color={color} fog={false} side={BackSide} />
    </mesh>
  );
};
