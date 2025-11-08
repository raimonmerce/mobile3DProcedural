import { Canvas } from "@react-three/fiber/native";
import { OrbitControls, Box } from "@react-three/drei";
import StarSystemMesh from "../r3f/starSystemMesh";
import { StarSystem} from "../../../src/objects/StarSystem";
import { Star} from "../../../src/objects/Star";
import { Planet} from "../../../src/objects/Planet";
import { Orbit} from "../../../src/objects/Orbit";

export default function MainScene() {

  const starSystem = new StarSystem();

  const sun = new Star(1.5, "yellow", 0.03, { x: 0, y: 0.3, z: 0 });
  starSystem.addStar(sun);

  const earth = new Planet(1.25, "blue", 0.01, { x: 0, y: 0.1, z: 0 });
  const mars = new Planet(1, "red", 0.008, { x: 0, y: 0, z: 0 });
  const venus = new Planet(1, "green", 0.007, { x: 0.3, y: 0, z: 0 });

  const earthOrbit = new Orbit(5, earth, 0.01, { x: 0, y: 0.2, z: 0 });
  const marsOrbit = new Orbit(7, mars, 0.008, { x: 0, y: 0, z: 0 });
  const venusOrbit = new Orbit(9, venus, 0.009, { x: 0, y: 0.8, z: 0 });

  starSystem.addOrbit(earthOrbit);
  starSystem.addOrbit(marsOrbit);
  starSystem.addOrbit(venusOrbit);

  return (
    <Canvas
      camera={{
        position: [0, 0, 100],
        fov: 50,
      }}
    >
      <color attach="background" args={["#000010"]} />
      <ambientLight intensity={0.8}/>
      <pointLight position={[0, 0, 0]} intensity={200} color={"yellow"}/>
      <StarSystemMesh starSystem={starSystem}/>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
