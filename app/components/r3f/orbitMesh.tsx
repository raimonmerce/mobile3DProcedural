import { useFrame } from "@react-three/fiber/native";
import { Orbit} from "../../../src/objects/Orbit";
import { CelestialMesh } from "./celestialMesh";
import { Object3D } from "three";
import { useEffect, useRef } from "react";

interface OrbitProps {
  orbit: Orbit;
}

export function OrbitMesh({ orbit }: OrbitProps) {
  const groupRef = useRef<Object3D>(null);
  const meshRef = useRef<Object3D>(null);

  useFrame(() => {
    if (meshRef.current){
      meshRef.current.rotation.z  += orbit.rotationSpeed;;
      if (meshRef.current.rotation.z > Math.PI * 2) {
          meshRef.current.rotation.z -= Math.PI * 2;
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[orbit.tilt.x, orbit.tilt.y, orbit.tilt.z]}>
        <group ref={meshRef}>
            <mesh>
                <torusGeometry args={[orbit.radius, 0.1, 8, 64]} />
                <meshStandardMaterial color={orbit.planet.color} />
            </mesh>
            <group position={[orbit.radius, 0, 0]}>
              <CelestialMesh obj={orbit.planet} />
            </group>
        </group>
    </group>
  );
}