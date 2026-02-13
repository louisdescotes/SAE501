"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState, Suspense, RefObject } from "react";
import { PerspectiveCamera } from "@react-three/drei";

import Grass from "../components/Grass";
import Butterflies from "../components/Butterflies";
import MovingClouds from "../components/Clouds";
import Human from "../components/Human";

function CameraController({ progress }: { progress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const isHumanSection = progress > 0 && progress < 1;

    if (!isHumanSection) {
      const scroll = window.scrollY;

      const zoom = 8 - scroll * 0.003;
      camera.position.z = Math.max(2, zoom);
      camera.position.y = 2.5 - scroll * 0.0008;
      camera.position.x = scroll * 0.002;
      camera.rotation.y = scroll * 0.0003;
    } else {
      camera.position.set(0, 0, 5);
      camera.rotation.set(0, 0, 0);
    }
  });

  return null;
}

type Props = {
  sectionRef: React.RefObject<HTMLElement | null>;
};

const Scene = ({ sectionRef }: Props) => {
  const [sectionProgress, setSectionProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const progress = (vh - rect.top) / (vh + rect.height) + 0.5;
      console.log(progress);

      const clamped = Math.min(Math.max(progress, 0), 1.5);
      setSectionProgress(clamped);
    };

    update();
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionRef]);

  const isSectionActive = sectionProgress > 0 && sectionProgress < 1.5;

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

      <CameraController progress={sectionProgress} />
      <directionalLight position={[5, 10, 5]} intensity={2} />
      <PerspectiveCamera makeDefault position={[0, 3, 8]} />

      <Butterflies visible={!isSectionActive} />
      <Grass visible={!isSectionActive} />
      <MovingClouds visible={!isSectionActive} />

      <Suspense fallback={null}>
        <Human progress={sectionProgress} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
