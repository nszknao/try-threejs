import React, { useRef, useState, VFC } from "react";
import { Canvas, useFrame, MeshProps } from "@react-three/fiber";
import type { Mesh } from "three";

type BoxProps = MeshProps;

const Box: VFC<BoxProps> = (props) => {
  const myMesh = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (myMesh.current === null) return;
    myMesh.current.rotation.x += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={myMesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export const TwoBoxes: VFC = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[20, 20, 20]} />
      <Box position={[-10, 0, 0]} />
      <Box position={[10, 0, 0]} />
    </Canvas>
  );
};
