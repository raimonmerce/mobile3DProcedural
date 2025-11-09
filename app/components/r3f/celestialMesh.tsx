import { useFrame } from '@react-three/fiber/native';
import { Color, AdditiveBlending, NormalBlending, ShaderMaterial, Object3D, Vector3 } from "three";
import { useCallback, useEffect, useMemo, useRef, useState  } from "react";
import { animated, useSpring } from "@react-spring/three";
import { CelestialObject } from "../../../src/objects/CelestialObject";
import { randomIntBetween } from "../../../src/utils/common";
import { useStore } from '../../../store/useStore';

export default function CelestialMesh({ obj }: { obj: CelestialObject }) {
  const { starSystem } = useStore();
  
  const pivotRef = useRef<Object3D>(null);
  const meshRef = useRef<Object3D>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (obj.exploding) {
      setTimeout(() => {
        uniforms.uTriggerExplosion.value = true;
        uniforms.uTime.value = 0.0;
      }, randomIntBetween(500, 1500));
    }
  }, [obj.exploding]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new Color(obj.color) },
    uExplode: { value: 0.6 },
    uTriggerExplosion: { value: false },
    uAmbient: { value: 0.5 }, 
    uLightPos: { value: new Vector3(0, 0, 0) },
    uLightColor: { value: new Color(starSystem?.star?.color) },
    uLightIntensity: { value: 1.0 },
    uIsStar: { value: obj.constructor.name === "Star" }
  }), [obj]);

  const shaderMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: !obj.exploding,
        blending: obj.exploding ? AdditiveBlending : NormalBlending,
        vertexShader: `
          precision highp float;

          uniform float uExplode;
          uniform float uTime;
          uniform bool uTriggerExplosion;

          varying vec3 vNormal;
          varying vec3 vView;
          varying vec3 vWorldPos;

          // pseudo-random vec3 from a vec3 seed
          vec3 hash3(vec3 p) {
              p = fract(p * 0.9 + 0.2);
              p *= 17.0;
              return fract(vec3(p.x * p.y * p.z, p.x + p.y + p.z, p.x * p.z + p.y));
          }

          void main() {
              vNormal = normalize(normalMatrix * normal);
              vec3 localPos = position;
              vec3 move = vec3(0.0);

              if (uTriggerExplosion) {
                  float grow = clamp(uTime * 80.0, 0.0, 200.0);
                  move = normal * uExplode * grow;
                  vec3 jitter = hash3(localPos + uTime) * 0.2;
                  move += jitter;
              }

              vec4 worldPos = modelMatrix * vec4(localPos + move, 1.0);
              vWorldPos = worldPos.xyz;
              vView = cameraPosition - worldPos.xyz;
              gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
        `,
        fragmentShader: `
          precision highp float;

          uniform float uTime;
          uniform vec3 uColor;
          uniform bool uTriggerExplosion;
          uniform vec3 uLightPos;
          uniform vec3 uLightColor;
          uniform float uLightIntensity;
          uniform float uAmbient;
          uniform bool uIsStar;

          varying vec3 vNormal;
          varying vec3 vWorldPos;

          void main() {
            float alpha = 1.0;
            vec3 finalColor = vec3(0.0, 0.0, 0.0);

            if (uTriggerExplosion) {
              alpha = 1.0 - clamp(uTime * 20.0, 0.0, 1.0);
            }
            
            if (uIsStar) {
              finalColor = uColor;
            } else {
              vec3 lightDir = normalize(uLightPos - vWorldPos);
              float diff = max(dot(normalize(vNormal), lightDir), 0.0);
              finalColor = uColor * (uAmbient + uLightColor * diff * uLightIntensity);
            }

            gl_FragColor = vec4(finalColor, alpha);
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
      </animated.mesh>
    </group>
  );
}