import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { View } from "react-native";
import { useStore } from "../store/useStore";

export default function Home() {
  const { count, increase } = useStore();

  return (
    <View style={{ flex: 1 }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box args={[1, 1, 1]} onClick={increase}>
          <meshStandardMaterial attach="material" color={count % 2 ? "hotpink" : "orange"} />
        </Box>
        <OrbitControls />
      </Canvas>
    </View>
  );
}
