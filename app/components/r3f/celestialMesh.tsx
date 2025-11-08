import { useFrame } from '@react-three/fiber/native';
import { Object3D } from "three";
import { useEffect, useRef } from "react";
import { CelestialObject } from "../../../src/objects/CelestialObject";

export function CelestialMesh({ obj }: { obj: CelestialObject }) {
  const pivotRef = useRef<Object3D>(null);
  const meshRef = useRef<Object3D>(null);

  useFrame(() => {
    if (meshRef.current){
      meshRef.current.rotation.y  += obj.rotationSpeed;;
      if (meshRef.current.rotation.y > Math.PI * 2) {
          meshRef.current.rotation.y -= Math.PI * 2;
      }
    }
  });

  return (
    <group ref={pivotRef} rotation={[obj.tilt.x, obj.tilt.y, obj.tilt.z]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[obj.scale, obj.scale, obj.scale]} />
        <meshStandardMaterial color={obj.color} />
      </mesh>
    </group>
  );
}