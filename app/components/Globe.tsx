// app/components/Globe.tsx
"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, PerspectiveCamera } from "@react-three/drei";
import type { Mesh } from "three";

// Separate component for the rotating mesh
function RotatingGlobe() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 28, 28]}>
      <meshBasicMaterial color="white" wireframe />
    </Sphere>
  );
}

// Main component that sets up the Canvas
function Globe() {
  return (
    <div className="w-[600px] h-[600px]">
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 4]}
          fov={45}
          near={0.1}
          far={100}
        />
        <ambientLight intensity={0.5} />
        <RotatingGlobe />
      </Canvas>
    </div>
  );
}

export default Globe;
