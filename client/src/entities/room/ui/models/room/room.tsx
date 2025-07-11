import { FC } from "react";
import { RoomProps } from "./room.props";
import { BaseModel } from "../base-model/base-model";

export const RoomModel: FC<RoomProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  name = "Room",
}) => {
  return (
    <BaseModel position={position} rotation={rotation} scale={scale} name={name} modelType='ROOM' />
  );
};
