import { Canvas } from "@react-three/fiber/native";
import { OrbitControls, Box } from "@react-three/drei";
import { StarSystemMesh } from "../r3f/starSystemMesh";
import { StarSystem} from "../../../src/objects/StarSystem";
import { Star} from "../../../src/objects/Star";
import { Planet} from "../../../src/objects/Planet";
import { Orbit} from "../../../src/objects/Orbit";

export default function MainScene() {

  const starSystem = new StarSystem();

  // Central star
  const sun = new Star(2, "yellow", 0.001, { x: 0, y: 0, z: 0 });
  starSystem.addStar(sun);

  // Planets
  const earth = new Planet(0.5, "blue", 0.01, { x: 0, y: 0, z: 0.4 });
  const mars = new Planet(0.4, "red", 0.008, { x: 0, y: 0, z: 0.2 });

  // Orbits
  const earthOrbit = new Orbit(5, earth, 0.01, { x: 0, y: 0, z: 0 });
  const marsOrbit = new Orbit(7, mars, 0.008, { x: 0, y: 0, z: 0.1 });

  // Add orbits to the system
  starSystem.addOrbit(earthOrbit);
  starSystem.addOrbit(marsOrbit);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <Box args={[1, 1, 1]}>
          <meshStandardMaterial attach="material" color={"orange"} />
      </Box> */}
      <StarSystemMesh starSystem={starSystem}/>
      <OrbitControls />
    </Canvas>
  );
}
