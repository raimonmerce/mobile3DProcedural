import { useFrame } from "@react-three/fiber/native";
import { Orbit} from "../../../src/objects/Orbit";
import { CelestialMesh } from "./celestialMesh";
import { AdditiveBlending, Object3D, Color, ShaderMaterial } from "three";
import { useCallback, useState, useRef, useMemo } from "react";

interface OrbitProps {
  orbit: Orbit;
}

export function OrbitMesh({ orbit }: OrbitProps) {
  const groupRef = useRef<Object3D>(null);
  const meshRef = useRef<Object3D>(null);
  const taurusTube = 0.2;

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    baseColor: { value: new Color(orbit.planet.color) }
  }), [orbit.planet.color]);

  const shaderMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 baseColor;
          varying vec2 vUv;

          void main() {
            float angle = mod(time - vUv.x, 1.0);
            float wave = sin(angle * 6.2831);
            float intensity = max(wave, 0.0);

            // Color scaled by intensity
            vec3 color = baseColor * intensity;

            // Alpha only where there is visible color
            float alpha = intensity;

            gl_FragColor = vec4(color, alpha);
          }
        `
      }),
    [uniforms]
  );

  useFrame((_state, delta) => {
    if (meshRef.current){
      meshRef.current.rotation.z  += orbit.rotationSpeed;;
      if (meshRef.current.rotation.z > Math.PI * 2) {
          meshRef.current.rotation.z -= Math.PI * 2;
      }
    }
    uniforms.time.value += delta * 0.1;
  });

  return (
    <group ref={groupRef} rotation={[orbit.tilt.x, orbit.tilt.y, orbit.tilt.z]}>
        <group ref={meshRef}>
            <mesh material={shaderMaterial}>
                <torusGeometry args={[orbit.radius, taurusTube, 8, 64]} />
                {/* <meshBasicMaterial color={orbit.planet.color} /> */}
            </mesh>
            <group position={[orbit.radius, 0, 0]}>
              <CelestialMesh obj={orbit.planet} />
            </group>
        </group>
    </group>
  );
}