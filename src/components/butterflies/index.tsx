"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ButterfliesProps {
  quantity?: number;
  boundary?: number;
}

export default function Butterflies({ quantity = 20 }: ButterfliesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRefs = useRef<THREE.ShaderMaterial[]>([]);
  const { clock } = useThree();

  const textures = useLoader(THREE.TextureLoader, [
    "/butterfly.png",
    "/butterfly2.png",
    "/butterfly3.png",
  ]);

  const vertexShader = `
  #define PI 3.14159265
  #define TWO_PI 6.28318530
  uniform float uTime;
  varying vec3 vP;
  varying vec2 vUv;
  attribute float displacement;
  varying float d;

  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {         
    vUv = uv;   
    d = displacement;                                                                                                                                                                              
    vec3 p = vec3(position);
    p.z += 1.4 * abs(p.x) * sin((uTime)*100.*(1.0 + 0.5*rand(vec2(d,0.))) - displacement);
    vec4 modelPosition = modelMatrix * vec4(p, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    vP = position;
    gl_Position = projectedPosition;
  }
  `;

  const fragmentShader = `
  varying vec3 vP;
  varying vec2 vUv;
  uniform sampler2D texture1;
  uniform float uTime;
  varying float d;

  void main() {
      vec4 texColor = texture2D(texture1, vUv);
      if ( texColor.a < 0.5 ) discard;
      gl_FragColor = vec4(texColor.rgb, texColor.a );
  }
  `;

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    group.clear();
    materialRefs.current = [];

    const geometry = new THREE.PlaneGeometry(1, 1, 2, 1);

    for (let i = 0; i < quantity; i++) {
      const texture = textures[Math.floor(Math.random() * textures.length)];

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0.0 },
          texture1: { value: texture },
        },
      });

      materialRefs.current.push(material);

      const butterflyGeometry = geometry.clone();
      const displacement = new Float32Array(
        butterflyGeometry.attributes.position.count,
      );
      for (let j = 0; j < displacement.length; j++) displacement[j] = i;
      butterflyGeometry.setAttribute(
        "displacement",
        new THREE.BufferAttribute(displacement, 1),
      );

      const butterfly = new THREE.Mesh(butterflyGeometry, material);

      butterfly.position.set(
        (Math.random() - 0.5) * 12,
        Math.random() * 2.5 + 0.5,
        (Math.random() - 0.5) * 10,
      );

      butterfly.scale.set(0.1, 0.1, 0.1);
      butterfly.rotation.x = -Math.PI * 0.5;
      butterfly.rotation.y = Math.random() * Math.PI * 0.1;
      butterfly.rotation.z = Math.random() * Math.PI;

      group.add(butterfly);
    }
  }, [textures, quantity]);

  useFrame(() => {
    if (!groupRef.current) return;

    materialRefs.current.forEach(
      (mat) => (mat.uniforms.uTime.value = clock.getElapsedTime() * 0.2),
    );

    groupRef.current.children.forEach((butterfly: any) => {
      const vector = new THREE.Vector3(0, 1, 0)
        .applyQuaternion(butterfly.quaternion)
        .normalize();
      butterfly.position.add(vector.multiplyScalar(0.001));

      ["x", "y", "z"].forEach((axis) => {
        if (axis !== "y") {
          if (butterfly.position[axis] > (axis === "x" ? 5 : 7.5))
            butterfly.position[axis] *= -1;
          if (butterfly.position[axis] < (axis === "x" ? -5 : -7.5))
            butterfly.position[axis] *= -1;
        }
      });
    });
  });

  return <group ref={groupRef} />;
}
