"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState, Suspense, RefObject } from "react";
import { PerspectiveCamera } from "@react-three/drei";

import Grass from "../components/Grass";
import Butterflies from "../components/Butterflies";
import MovingClouds from "../components/Clouds";
import Human from "../components/Human";

type Props = {
  sectionRef: RefObject<HTMLElement>;
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
