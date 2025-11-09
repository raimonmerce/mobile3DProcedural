import { useFrame } from '@react-three/fiber/native';
import { Color,AdditiveBlending, ShaderMaterial, Object3D } from "three";
import { useCallback, useEffect, useMemo, useRef, useState  } from "react";
import { animated, useSpring } from "@react-spring/three";
import { CelestialObject } from "../../../src/objects/CelestialObject";
import { randomIntBetween } from "../../../src/utils/common";

export default function CelestialMesh({ obj }: { obj: CelestialObject }) {
  
  const pivotRef = useRef<Object3D>(null);
  const meshRef = useRef<Object3D>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (obj.exploding) {
      setTimeout(() => {
        uniforms.uTrigger.value = true;
        uniforms.uTime.value = 0.0;
      }, randomIntBetween(500, 1500));
    }
  }, [obj.exploding]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new Color(obj.color) },
    uExplode: { value: 0.6 },
    uTrigger: { value: false }
  }), [obj]);

  const shaderMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        vertexShader: `
          precision highp float;

          uniform float uExplode;
          uniform float uTime;
          uniform bool uTrigger;

          varying vec3 vNormal;
          varying vec3 vView;

          // pseudo-random vec3 from a vec3 seed
          vec3 hash3(vec3 p) {
              p = fract(p * 0.9 + 0.2);
              p *= 17.0;
              return fract(vec3(p.x * p.y * p.z, p.x + p.y + p.z, p.x * p.z + p.y));
          }

          void main() {
              vNormal = normalize(normalMatrix * normal);
              vec3 localPos = position;

              vec3 move = vec3(0.0); // default: no movement

              if (uTrigger) {
                  // optional smooth growth factor over time
                  float grow = clamp(uTime * 80.0, 0.0, 200.0); // 0 → 1

                  // base displacement along normal
                  move = normal * uExplode * grow;

                  // add subtle random offset for organic effect
                  vec3 jitter = hash3(localPos + uTime) * 0.2; // dynamic over time
                  move += jitter;
              }

              vec4 worldPos = modelMatrix * vec4(localPos + move, 1.0);
              vView = cameraPosition - worldPos.xyz;
              gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
        `,
        fragmentShader: `
          precision highp float;

          uniform float uTime;
          uniform vec3 uColor;
          uniform bool uTrigger;

          void main() {
            float alpha = 1.0;

            if (uTrigger) {
              // fade out over 2 seconds after trigger
              alpha = 1.0 - clamp(uTime * 20.0, 0.0, 1.0);
            }

            gl_FragColor = vec4(uColor, alpha);
          }
        `
      }),
    [uniforms]
  );

  const { scale } = useSpring({
    scale: active ? obj.scale * 1.3 : obj.scale,
    config: { mass: 1, tension: 250, friction: 12 },
  });

  useFrame((_state, delta) => {
    if (meshRef.current){
      meshRef.current.rotation.z  += obj.rotationSpeed;;
      if (meshRef.current.rotation.z > Math.PI * 2) {
          meshRef.current.rotation.z -= Math.PI * 2;
      }
    }
    uniforms.uTime.value += delta * 0.1;
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
        material={shaderMaterial}
      >
        <boxGeometry args={[obj.scale, obj.scale, obj.scale]} />

        {/* {isStar ? (
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
        )} */}
      </animated.mesh>
    </group>
  );
}