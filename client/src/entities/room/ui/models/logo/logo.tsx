import { FC } from "react";
import { LogoProps } from "../../../model/types";
import { BaseModel } from "../base-model/base-model";

export const Logo: FC<LogoProps> = (props) => {
  return <BaseModel {...props} modelPath='/Room/logo.glb' />;
};
