import { useFrame } from "@react-three/fiber/native";
import { StarSystem } from "../../../src/objects/StarSystem";
import CelestialMesh from "./celestialMesh";
import OrbitMesh from "./orbitMesh";
import { Object3D } from "three";
import { useRef } from "react";

interface StarSystemMeshProps {
  starSystem: StarSystem;
}

export default function StarSystemMesh({ starSystem }: StarSystemMeshProps) {
  const systemGroup = useRef<Object3D>(null);

  // useFrame(() => {
  //   starSystem.orbits.forEach((orbit) => orbit.animate());
  //   starSystem.star?.animate();
  // });

  return (
    <group ref={systemGroup}>
      {starSystem.star && <CelestialMesh obj={starSystem.star} />}

      {starSystem.orbits.map((orbit, index) => (
        <OrbitMesh key={index} orbit={orbit}/>
      ))}
    </group>
  );
}