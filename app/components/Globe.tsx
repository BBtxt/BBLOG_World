import React, { useRef } from "react";
import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Globe: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    globeRef.current.rotation.y += 0.001;
  });
  
  return (
    <Sphere args={[1, 24, 24]} ref={globeRef}>
      <meshBasicMaterial color="white" wireframe />
    </Sphere>
  );
};

export default Globe;
