import { Canvas } from "@react-three/fiber/native";
import { View, Text, Button, StyleSheet } from "react-native";
import { useStore } from "../store/useStore";
import MainScene from "./components/ui/mainScene";

export default function Home() {
  const { count, increase } = useStore();

  return (
    <View style={{ flex: 1 }}>
      <MainScene />

      {/* <View style={styles.uiContainer}>
        <Text style={styles.counterText}>Count: {count}</Text>
        <View style={styles.buttonRow}>
          <Button title="Increase" onPress={increase} />
          <Button title="Decrease" onPress={increase} />
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  uiContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  counterText: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});