import { useFrame } from "@react-three/fiber/native";
import { Orbit} from "../../../src/objects/Orbit";
import CelestialMesh from "./celestialMesh";
import { AdditiveBlending, Object3D, Color, ShaderMaterial } from "three";
import { useEffect, useRef, useMemo, useState } from "react";
import { randomIntBetween } from "../../../src/utils/common";

interface OrbitProps {
  orbit: Orbit;
}

export default function OrbitMesh({ orbit }: OrbitProps) {
  const groupRef = useRef<Object3D>(null);
  const meshRef = useRef<Object3D>(null);
  const taurusTube = 0.2;

  useEffect(() => {
    if (orbit.exploding) {
      setTimeout(() => {
        uniforms.uTrigger.value = true;
        uniforms.uTimeFadeOut.value = 0.0;
      }, randomIntBetween(0, 1000));
    } else {
      uniforms.uTrigger.value = false;
    }
  }, [orbit.exploding]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTimeFadeOut: { value: 0 },
    uColor: { value: new Color(orbit.planet.color) },
    uExplode: { value: 0.3 },
    uTrigger: { value: false }
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
          uniform float uTime;
          uniform float uTimeFadeOut;
          uniform vec3 uColor;
          varying vec2 vUv;
          uniform bool uTrigger;

          void main() {
            float angle = mod(uTime - vUv.x, 1.0);
            float wave = sin(angle * 6.2831);
            float intensity = max(wave, 0.0);

            // Color scaled by intensity
            vec3 color = uColor * intensity;

            // Alpha only where there is visible color
            
            float alpha = 1.0;

            if (uTrigger) {
              alpha = 1.0 - clamp(uTimeFadeOut * 20.0, 0.0, 1.0);
            } else {
              alpha = intensity;
            }

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
    uniforms.uTime.value += delta * 0.1;
    if (orbit.exploding) uniforms.uTimeFadeOut.value += delta * 0.1;
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