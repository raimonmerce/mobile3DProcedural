import { useFrame } from '@react-three/fiber/native';
import { Object3D } from "three";
import { useCallback, useRef, useState  } from "react";
import { animated, useSpring } from "@react-spring/three";
import { CelestialObject } from "../../../src/objects/CelestialObject";

export function CelestialMesh({ obj }: { obj: CelestialObject }) {
  const pivotRef = useRef<Object3D>(null);
  const meshRef = useRef<Object3D>(null);
  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? obj.scale * 1.3 : obj.scale,
    config: { mass: 1, tension: 250, friction: 12 },
  });

  useFrame(() => {
    if (meshRef.current){
      meshRef.current.rotation.z  += obj.rotationSpeed;;
      if (meshRef.current.rotation.z > Math.PI * 2) {
          meshRef.current.rotation.z -= Math.PI * 2;
      }
    }
  });

  const handleClick = useCallback(() => {
    obj.click();
    setActive(true);
    setTimeout(() => setActive(false), 400);
  }, [obj]);

  const isStar = obj.constructor.name === "Star";
  return (
    <group ref={pivotRef} rotation={[obj.tilt.x, obj.tilt.y, obj.tilt.z]}>
      <animated.mesh
        ref={meshRef}
        onClick={(event : any) => {
          event.stopPropagation();
          handleClick();
        }}
        scale={scale}
      >
        <boxGeometry args={[obj.scale, obj.scale, obj.scale]} />

        {isStar ? (
          <meshStandardMaterial
            color={obj.color}
            emissive={obj.color}
            emissiveIntensity={1.}
          />
        ) : (
          <meshStandardMaterial
            color={obj.color}
            emissive={obj.color}
          />
        )}
      </animated.mesh>
    </group>
  );
}