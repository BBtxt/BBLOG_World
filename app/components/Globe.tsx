// app/components/Globe.tsx
"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, PerspectiveCamera } from "@react-three/drei";
import type { Mesh } from "three";

function RotatingGlobe() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1.5, 32, 32]}
    >
      <meshBasicMaterial
        color="white"
        wireframe
        opacity={0.8}
        transparent={true}
      />
    </Sphere>
  );
}

function Globe() {
  return (
    <div className="w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
      <Canvas
        style={{ background: "transparent" }}
        camera={{ position: [0, 0, 5] }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={45}
          near={0.1}
          far={100}
        />
        <ambientLight intensity={0.8} />
        <RotatingGlobe />
      </Canvas>
    </div>
  );
}

export default Globe;
