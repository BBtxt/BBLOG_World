// GlobeCanvas.tsx
import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Sphere, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// Responsive Globe component that adjusts to viewport
const Globe: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  // Calculate responsive size based on viewport
  const size = Math.min(viewport.width, viewport.height) * 0.4;

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.scale.set(size, size, size);
    }
  }, [size]);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere args={[1, 32, 32]} ref={globeRef}>
      <meshBasicMaterial color="white" wireframe />
    </Sphere>
  );
};

// Responsive camera that adjusts to viewport
const ResponsiveCamera: React.FC = () => {
  const { viewport } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

  useEffect(() => {
    if (cameraRef.current) {
      // Adjust camera position based on viewport size
      const distance = Math.max(
        4,
        6 / Math.min(viewport.width, viewport.height),
      );
      cameraRef.current.position.z = distance;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [viewport]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 5]}
      fov={45}
      near={0.1}
      far={100}
    />
  );
};

const GlobeCanvas: React.FC = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] md:h-[calc(100vh-100px)]">
      <Canvas>
        <ResponsiveCamera />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Globe />
      </Canvas>
    </div>
  );
};

export default GlobeCanvas;
