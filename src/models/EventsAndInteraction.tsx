import React, { useRef, useState, VFC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

const MyRotatingBox: VFC = () => {
  const myMesh = useRef<Mesh>(null);
  const [active, setActive] = useState(false);

  useFrame((state) => {
    const a = state.clock.getElapsedTime();
    if (myMesh.current === null) return;
    myMesh.current.rotation.x = a;
  });

  return (
    <mesh
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      ref={myMesh}
    >
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
};

export const EventsAndInteraction: VFC = () => {
  return (
    <Canvas>
      <MyRotatingBox />
      <ambientLight intensity={0.1} />
      <directionalLight />
    </Canvas>
  );
};
