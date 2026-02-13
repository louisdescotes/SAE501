"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";

const Human = ({ progress }: { progress: number }) => {
  const { scene } = useGLTF("/human.glb");
  const ref = useRef<any>(null);
  const { camera, size } = useThree();

  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      setMouseX(x);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    const visible = progress > 0 && progress < 1.5;

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

    const targetRotationY = mouseX * 0.3;
    ref.current.rotation.y += (targetRotationY - ref.current.rotation.y) * 0.1;
  });

  return (
    <group>
      <directionalLight
        intensity={8}
        position={[0, -10 + progress * 8, 5]}
        castShadow
      />
      <primitive ref={ref} object={scene} />
    </group>
  );
};

useGLTF.preload("/human.glb");
export default Human;
