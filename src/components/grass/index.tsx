"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

const vertexShader = `
uniform float uTime;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;

float wave(float waveSize, float tipDistance, float centerDistance) {
  bool isTip = (gl_VertexID + 1) % 5 == 0;
  float waveDistance = isTip ? tipDistance : centerDistance;
  return sin(uTime + waveSize) * waveDistance;
}

void main() {
  vPosition = position;
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  
  if (vPosition.y < 0.0) {
    vPosition.y = 0.0;
  } else {
    vPosition.x += wave(uv.x * 10.0, 0.3, 0.1);      
  }
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uCloud;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;

const vec3 green = vec3(0.852, 0.467, 0.165);

void main() {
  vec3 color = mix(green * 0.7, green, vPosition.y);
  color = mix(color, texture2D(uCloud, vUv).rgb, 0.4);
  float lighting = normalize(dot(vNormal, vec3(10))) * 0.03;
  gl_FragColor = vec4(color + lighting, 1.0);
}
`;

const BLADE_CONFIG = {
  WIDTH: 0.1,
  HEIGHT: 0.8,
  HEIGHT_VAR: 0.6,
  VERTEX_COUNT: 5,
  TIP_OFFSET: 0.1,
};

class GrassGeometry extends THREE.BufferGeometry {
  constructor(size: number, count: number) {
    super();

    const positionsData = new Float32Array(
      count * BLADE_CONFIG.VERTEX_COUNT * 3,
    );
    const uvsData = new Float32Array(count * BLADE_CONFIG.VERTEX_COUNT * 2);
    const indicesData = new Uint32Array(count * 9);

    const halfSize = size * 0.5;
    const surfaceRange = size;

    for (let i = 0; i < count; i++) {
      const radius = halfSize * Math.random();
      const theta = Math.random() * Math.PI * 2;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);

      const uvOffset = i * BLADE_CONFIG.VERTEX_COUNT * 2;
      const u = (x + halfSize) / surfaceRange;
      const v = (y + halfSize) / surfaceRange;
      for (let j = 0; j < BLADE_CONFIG.VERTEX_COUNT; j++) {
        uvsData[uvOffset + j * 2] = u;
        uvsData[uvOffset + j * 2 + 1] = v;
      }

      const height =
        BLADE_CONFIG.HEIGHT + Math.random() * BLADE_CONFIG.HEIGHT_VAR;
      const yaw = Math.random() * Math.PI * 2;
      const bend = Math.random() * Math.PI * 2;

      const sinYaw = Math.sin(yaw);
      const cosYaw = Math.cos(yaw);
      const sinBend = Math.sin(bend);
      const cosBend = Math.cos(bend);

      const posOffset = i * BLADE_CONFIG.VERTEX_COUNT * 3;
      const w = BLADE_CONFIG.WIDTH;

      positionsData[posOffset] = x + sinYaw * w * 0.5;
      positionsData[posOffset + 1] = 0;
      positionsData[posOffset + 2] = y - cosYaw * w * 0.5;

      positionsData[posOffset + 3] = x - sinYaw * w * 0.5;
      positionsData[posOffset + 4] = 0;
      positionsData[posOffset + 5] = y + cosYaw * w * 0.5;

      positionsData[posOffset + 6] = x - sinYaw * w * 0.25;
      positionsData[posOffset + 7] = height * 0.5;
      positionsData[posOffset + 8] = y + cosYaw * w * 0.25;

      positionsData[posOffset + 9] = x + sinYaw * w * 0.25;
      positionsData[posOffset + 10] = height * 0.5;
      positionsData[posOffset + 11] = y - cosYaw * w * 0.25;

      positionsData[posOffset + 12] = x + sinBend * BLADE_CONFIG.TIP_OFFSET;
      positionsData[posOffset + 13] = height;
      positionsData[posOffset + 14] = y - cosBend * BLADE_CONFIG.TIP_OFFSET;

      const vIndex = i * BLADE_CONFIG.VERTEX_COUNT;
      const idxOffset = i * 9;
      indicesData[idxOffset] = vIndex;
      indicesData[idxOffset + 1] = vIndex + 1;
      indicesData[idxOffset + 2] = vIndex + 2;
      indicesData[idxOffset + 3] = vIndex + 2;
      indicesData[idxOffset + 4] = vIndex + 4;
      indicesData[idxOffset + 5] = vIndex + 3;
      indicesData[idxOffset + 6] = vIndex + 3;
      indicesData[idxOffset + 7] = vIndex;
      indicesData[idxOffset + 8] = vIndex + 2;
    }

    this.setAttribute("position", new THREE.BufferAttribute(positionsData, 3));
    this.setAttribute("uv", new THREE.BufferAttribute(uvsData, 2));
    this.setIndex(new THREE.BufferAttribute(indicesData, 1));
    this.computeVertexNormals();
  }
}

export default function Grass({ size = 20, count = 15000 }) {
  const materialRef = useRef(null);
  const cloudTexture = useLoader(THREE.TextureLoader, "/cloud.jpg");

  useMemo(() => {
    cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
  }, [cloudTexture]);

  const geometry = useMemo(() => new GrassGeometry(size, count), [size, count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCloud: { value: cloudTexture },
    }),
    [cloudTexture],
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        uniforms={uniforms}
      />
    </mesh>
  );
}
