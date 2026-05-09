"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function ResumeCard({ position, rotation, scale }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[3, 4.2, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
        {/* Simulating lines of text on the resume */}
        <mesh position={[0, 1.2, 0.06]}>
          <planeGeometry args={[2, 0.2]} />
          <meshBasicMaterial color="#444444" />
        </mesh>
        <mesh position={[0, 0.6, 0.06]}>
          <planeGeometry args={[2.4, 0.1]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        <mesh position={[0, 0.3, 0.06]}>
          <planeGeometry args={[2.4, 0.1]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        <mesh position={[0, -0.2, 0.06]}>
          <planeGeometry args={[2.4, 0.8]} />
          <meshBasicMaterial color="#222222" />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function ThreeDScene() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <ResumeCard position={[-2, 0, 0]} rotation={[0, 0.2, -0.1]} scale={1.2} />
        <ResumeCard position={[2.5, -0.5, -2]} rotation={[0, -0.3, 0.1]} scale={0.9} />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
}
