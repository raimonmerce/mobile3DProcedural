import { useFrame } from '@react-three/fiber/native';
import { Color, AdditiveBlending, NormalBlending, ShaderMaterial, Object3D, Vector3 } from "three";
import { useCallback, useEffect, useMemo, useRef, useState  } from "react";
import { animated, useSpring } from "@react-spring/three";
import { CelestialObject } from "../../../src/objects/CelestialObject";
import { randomIntBetween, getGeometry } from "../../../src/utils/common";
import { useStore } from '../../../store/useStore';

const vertexShader = `
precision highp float;

uniform float uExplode;
uniform float uTime;
uniform bool uTriggerExplosion;

varying vec3 vNormal;
varying vec3 vView;
varying vec3 vWorldPos;

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
    } else {
        float assemble = 1.0 - clamp(uTime * 10.0, 0.0, 1.0); // 1 → 0 over time
        vec3 jitter = hash3(localPos + uTime) * 0.4; // start scattered
        move = normal * uExplode * assemble * 25.0 + jitter * assemble;
    }

    vec4 worldPos = modelMatrix * vec4(localPos + move, 1.0);
    vWorldPos = worldPos.xyz;
    vView = cameraPosition - worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const fragmentShader = `
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
  float alpha = clamp(uTime * 5.0, 0.0, 1.0);
  vec3 finalColor = vec3(0.0);

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
`;

export default function CelestialMesh({ obj}: { obj: CelestialObject }) {
  const { starSystem } = useStore();
  
  const pivotRef = useRef<Object3D>(null);
  const meshRef = useRef<Object3D>(null);
  const [active, setActive] = useState(false);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new Color(obj.color) },
    uExplode: { value: 0.6 },
    uTriggerExplosion: { value: false },
    uTriggerCreation: { value: true },
    uAmbient: { value: obj.constructor.name === "Star"? 1.0 : 0.4 }, 
    uLightPos: { value: new Vector3(0, 0, 0) },
    // uLightColor: { value: new Color(starSystem?.star?.color) },
    uLightColor: { value: new Color("white") },
    uLightIntensity: { value: 7.5 },
    uIsStar: { value: obj.constructor.name === "Star" }
  }), [obj, starSystem]);

  useEffect(() => {
    if (obj.exploding) {
      const timeout = setTimeout(() => {
        uniforms.uTriggerExplosion.value = true;
        uniforms.uTime.value = 0.0;
      }, randomIntBetween(500, 1500));
      return () => clearTimeout(timeout);
    }
  }, [obj.exploding, uniforms]);

  const shaderMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: !uniforms.uTriggerExplosion.value,
        blending: uniforms.uTriggerExplosion.value ? AdditiveBlending : NormalBlending,
        vertexShader,
        fragmentShader
      }),
    [uniforms, obj.exploding]
  );

  const { scale } = useSpring({
    scale: active ? obj.scale * 1.3 : obj.scale,
    config: { mass: 1, tension: 250, friction: 12 },
  });

  useFrame((_state, delta) => {
    if (meshRef.current){
      meshRef.current.rotation.z  += obj.rotationSpeed;;
      if (meshRef.current.rotation.z > Math.PI * 2) meshRef.current.rotation.z -= Math.PI * 2;
    }
    uniforms.uTime.value += delta * 0.1;
  });

  const handleClick = useCallback(() => {
    obj.click();
    setActive(true);
    setTimeout(() => setActive(false), 400);
  }, [obj]);

  const geometry = useMemo(() => getGeometry(obj.shape, obj.scale), [obj.shape, obj.scale]);

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
        <primitive object={geometry} />
      </animated.mesh>
    </group>
  );
}