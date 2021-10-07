import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, VFC } from "react";

import { Loader } from "src/components/Loder";

export const PointerLock: VFC = () => {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};
