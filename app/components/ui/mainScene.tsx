import { Canvas } from "@react-three/fiber/native";
import { OrbitControls, Box } from "@react-three/drei";
import StarSystemMesh from "../r3f/starSystemMesh";
import { StarSystem} from "../../../src/objects/StarSystem";

interface MainSceneProps {
  starSystem: StarSystem | null;
}

export default function MainScene({ starSystem }: MainSceneProps) {

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
      {starSystem &&
        <StarSystemMesh starSystem={starSystem}/>
      }
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
