import { Html, useProgress } from "@react-three/drei";
import React, { VFC } from "react";

export const Loader: VFC = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};
