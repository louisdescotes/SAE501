import { useFrame } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface CloudData {
  seed: number;
  segments: number;
  volume: number;
  scale: number;
  growth: number;
  color: string;
  fade: number;
  position: [number, number, number];
  speed: number;
}

const MovingClouds = () => {
  const cloudRefs = useRef<THREE.Group[]>([]);

  const clouds: CloudData[] = [
    {
      seed: 17,
      segments: 10,
      volume: 5,
      scale: 2,
      growth: 3,
      color: "#ffc598",
      fade: 35,
      position: [-20, 10, 0],
      speed: 0.0051,
    },
    {
      seed: 18,
      segments: 10,
      volume: 4,
      scale: 1.1,
      growth: 3,
      color: "#ffc598",
      fade: 20,
      position: [0, 8, 0],
      speed: 0.005109,
    },
    {
      seed: 19,
      segments: 10,
      volume: 3,
      scale: 1.4,
      growth: 3,
      color: "#ffc598",
      fade: 30,
      position: [-10, 9, 0],
      speed: 0.005105,
    },
  ];

  useFrame(() => {
    cloudRefs.current.forEach((cloud, idx) => {
      if (!cloud) return;
      cloud.position.x += clouds[idx].speed;
      if (cloud.position.x > 13) {
        cloud.position.x = -20;
      }
    });
  });

  return (
    <Clouds material={THREE.MeshBasicMaterial} position={[0, 0, 0]}>
      {clouds.map((c, idx) => (
        <Cloud
          key={idx}
          ref={(el) => {
            if (el) cloudRefs.current[idx] = el;
          }}
          seed={c.seed}
          segments={c.segments}
          volume={c.volume}
          scale={c.scale}
          growth={c.growth}
          color={c.color}
          fade={c.fade}
          position={c.position}
        />
      ))}
    </Clouds>
  );
};

export default MovingClouds;
