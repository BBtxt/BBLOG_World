import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import Globe from './Globe';

const GlobeCanvas: React.FC = () => {
  return (
    <Canvas camera={{position: [0,0,5], fov: 0}}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={0.5} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} near={0.1} far={100} />
      <Globe />
    </Canvas>
  );
};

export default GlobeCanvas;
