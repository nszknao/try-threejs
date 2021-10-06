import React, { Suspense, VFC } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Environment,
  Html,
  OrbitControls,
  useProgress,
} from "@react-three/drei";

const Loader: VFC = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const Model: VFC = () => {
  const gltf = useLoader(GLTFLoader, "./assets/Bauhaus.gltf");

  return <primitive object={gltf.scene} scale={0.5} />;
};

export const LoadingModels: VFC = () => {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <Model />
        <OrbitControls />
        <Environment preset="sunset" background />
      </Suspense>
    </Canvas>
  );
};
