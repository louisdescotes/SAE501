"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import Grass from "../components/Grass";
import { PerspectiveCamera } from "@react-three/drei";
import Butterflies from "../components/Butterflies";
import MovingClouds from "../components/Clouds";

const CameraController = () => {
  const { camera } = useThree();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    const zoom = 8 - scrollY * 0.003;
    camera.position.z = Math.max(2, zoom);
    camera.position.y = 2.5 - scrollY * 0.0014;
    camera.position.x = 0 - scrollY * -0.002;
    camera.rotation.y = scrollY * 0.0003;
  });

  return null;
};

const Scene = () => {
  return (
    <>
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
        <CameraController />
        <Butterflies />
        <Grass />
        <MovingClouds />
      </Canvas>
    </>
  );
};

export default Scene;
