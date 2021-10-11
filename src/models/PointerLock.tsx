import { PointerLockControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState, VFC } from "react";

import { Loader } from "src/components/Loder";

export const PointerLock: VFC = () => {
  const controls = useRef(null);
  const [displayInstructions, setDisplayInstructions] = useState(true);

  if (typeof window === "undefined") return null;

  return (
    <>
      {displayInstructions && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <p style={{ fontSize: 36 }}>Click to play</p>
            <p>
              Move: WASD
              <br />
              Jump: SPACE
              <br />
              Look: MOUSE
            </p>
          </div>
        </div>
      )}

      <Canvas>
        <perspectiveCamera
          args={[75, window.innerWidth / window.innerHeight, 1, 1000]}
          position={[0, 10, 0]}
        />
        <color attach="background" args={[0xffffff]} />
        <fog args={[0xffffff, 0, 750]} />
        <hemisphereLight
          args={[0xeeeeff, 0x777788, 0.75]}
          position={[0.5, 1, 0.75]}
        />
        <PointerLockControls
          ref={controls}
          onLock={() => setDisplayInstructions(false)}
          onUnlock={() => setDisplayInstructions(true)}
        />
        <Suspense fallback={<Loader />}>
          {/* floor */}
          <mesh rotation={[0, 0, 0]}>
            <planeGeometry attach="geometry" args={[2000, 2000, 100, 100]} />
            <meshBasicMaterial color="blue" />
          </mesh>
        </Suspense>
      </Canvas>
    </>
  );
};
