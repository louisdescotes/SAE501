"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState, Suspense, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import Butterflies from "../components/butterflies";
import Grass from "../components/grass";
import MovingClouds from "../components/clouds";
import Human from "../components/Human";

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

function CameraController({
  progress,
  introProgress,
}: {
  progress: number;
  introProgress: number;
}) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 2.5, 8));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));

  useFrame(() => {
    if (introProgress < 1) {
      const t = introProgress;

      targetPosition.current.set(0, 2.5, lerp(12, 8, t));
      targetRotation.current.set(lerp(-0.12, 0, t), lerp(0.15, 0, t), 0);
    } else {
      const isHumanSection = progress > 0 && progress < 1.5;

      if (!isHumanSection) {
        const scroll = window.scrollY;

        targetPosition.current.set(
          scroll * 0.002,
          2.5 - scroll * 0.0008,
          Math.max(2, 8 - scroll * 0.003),
        );

        targetRotation.current.set(0, scroll * 0.0003, 0);
      } else {
        targetPosition.current.set(0, 0, 5);
        targetRotation.current.set(0, 0, 0);
      }
    }

    const lerpFactor = introProgress < 1 ? 0.03 : 0.05;

    camera.position.x = lerp(
      camera.position.x,
      targetPosition.current.x,
      lerpFactor,
    );
    camera.position.y = lerp(
      camera.position.y,
      targetPosition.current.y,
      lerpFactor,
    );
    camera.position.z = lerp(
      camera.position.z,
      targetPosition.current.z,
      lerpFactor,
    );

    camera.rotation.x = lerp(
      camera.rotation.x,
      targetRotation.current.x,
      lerpFactor,
    );
    camera.rotation.y = lerp(
      camera.rotation.y,
      targetRotation.current.y,
      lerpFactor,
    );
    camera.rotation.z = lerp(
      camera.rotation.z,
      targetRotation.current.z,
      lerpFactor,
    );
  });

  return null;
}

type Props = {
  sectionRef: React.RefObject<HTMLElement | null>;
  loadingComplete?: boolean;
  loadingProgress?: number;
};

const Scene = ({ sectionRef, loadingComplete = false }: Props) => {
  const [sectionProgress, setSectionProgress] = useState(0);
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    const startDelay = loadingComplete ? 0 : 1800;

    const timer = setTimeout(() => {
      const startTime = Date.now();
      const duration = 2000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);
        setIntroProgress(eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }, startDelay);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const progress = (vh - rect.top) / (vh + rect.height) + 0.5;
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
      <PerspectiveCamera makeDefault position={[0, 2.5, 15]} />

      <CameraController
        progress={sectionProgress}
        introProgress={introProgress}
      />

      <Suspense fallback={null}>
        <Butterflies visible={!isSectionActive} />
        <Grass visible={!isSectionActive} />
        <MovingClouds visible={!isSectionActive} />
        <Human progress={sectionProgress} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
