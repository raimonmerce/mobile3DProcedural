import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useStore } from "../../../store/useStore";
import { Earth, Bomb } from "lucide-react-native";

export default function MainUI() {

  const { count, increase } = useStore();

  return (
    <View style={styles.uiContainer}>
      <Text style={styles.counterText}>Count: {count}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.iconButton} onPress={increase}>
          <Earth color="white" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={increase}>
          <Bomb color="white" size={24} />
        </TouchableOpacity>
      </View>
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
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
});