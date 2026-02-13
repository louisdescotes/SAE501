"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

const Human = ({ progress }: { progress: number }) => {
  const { scene } = useGLTF("/human.glb");
  const ref = useRef<any>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!ref.current) return;

    const visible = progress > 0 && progress < 1;

    ref.current.traverse((child: any) => {
      if (child.material) {
        child.material.transparent = true;
        const target = visible ? 1 : 0;
        child.material.opacity += (target - child.material.opacity) * 0.08;
      }
    });

    if (!visible) return;
    const y = -10 + progress * 8;

    ref.current.position.set(0, y, camera.position.z - 5);
  });

  return <primitive ref={ref} object={scene} />;
};

useGLTF.preload("/human.glb");
export default Human;
