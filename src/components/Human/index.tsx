"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";

const Human = ({
  scrollY,
  sectionStart,
  sectionEnd,
}: {
  scrollY: number;
  sectionStart: number;
  sectionEnd: number;
}) => {
  const { scene } = useGLTF("/human.glb");
  const ref = useRef<any>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!ref.current) return;

    const isVisible = scrollY >= sectionStart && scrollY <= sectionEnd;

    ref.current.traverse((child: any) => {
      if (child.material) {
        child.material.transparent = true;
        const target = isVisible ? 1 : 0;
        child.material.opacity += (target - child.material.opacity) * 0.1;
      }
    });

    if (isVisible) {
      const progress = (scrollY - sectionStart) / (sectionEnd - sectionStart);
      const yPos = progress * 14;
      ref.current.position.set(0.4, yPos - 14.5, camera.position.z - 5);
      ref.current.rotation.set(-0.05, 0.45, 0);
    }
  });

  return <primitive ref={ref} object={scene} />;
};

useGLTF.preload("/human.glb");
export default Human;
