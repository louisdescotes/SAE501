"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState, Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";

import Grass from "../components/Grass";
import Butterflies from "../components/Butterflies";
import MovingClouds from "../components/Clouds";
import Human from "../components/Human";

type CameraControllerProps = {
  scrollY: number;
  isSection3: boolean;
};

const CameraController = ({ scrollY, isSection3 }: CameraControllerProps) => {
  const { camera } = useThree();

  useFrame(() => {
    if (!isSection3) {
      const zoom = 8 - scrollY * 0.003;
      camera.position.z = Math.max(2, zoom);
      camera.position.y = 2.5 - scrollY * 0.0008;
      camera.position.x = scrollY * 0.002;
      camera.rotation.y = scrollY * 0.0003;
    } else {
      camera.position.z = 0;
      camera.position.y = 0;
      camera.position.y = 0;
      camera.position.z = 0;
    }
  });

  return null;
};

const sectionStart = 2000;
const sectionEnd = 2500 + sectionStart + window.innerHeight;

const Scene = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSection3 = scrollY > 1300;

  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "#FAFAF8",
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} />

      <PerspectiveCamera makeDefault position={[0, 3, 8]} />

      <CameraController isSection3={isSection3} scrollY={scrollY} />

      <Butterflies visible={!isSection3} />
      <Grass visible={!isSection3} />
      <MovingClouds visible={!isSection3} />

      <Suspense fallback={null}>
        <Human
          scrollY={scrollY}
          sectionStart={sectionStart}
          sectionEnd={sectionEnd}
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
