"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import Grass from "../components/grass";
import { PerspectiveCamera } from "@react-three/drei";
import Butterflies from "../components/butterflies";

const Scene = () => {
  return (
    <Canvas
      id="canvas"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "#FAFAF8",
      }}
    >
      <ambientLight intensity={Math.PI / 2} />
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[0, 3, 8]}
        near={0.1}
        far={100}
      />
      <Butterflies />
      <Grass />
    </Canvas>
  );
};
export default Scene;
