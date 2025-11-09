import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useStore } from "../../../store/useStore";
import { Earth, Bomb } from "lucide-react-native";
import { StarSystem} from "../../../src/objects/StarSystem";
import { Star} from "../../../src/objects/Star";
import { Planet} from "../../../src/objects/Planet";
import { Orbit} from "../../../src/objects/Orbit";

interface MainUIProps {
  starSystem: StarSystem | null;
}

export default function MainUI({ starSystem }: MainUIProps) {
  const { updateStarSystem } = useStore();

  const handleExplode = () => {
    if (starSystem) {
      starSystem.explode();
      updateStarSystem(starSystem);
      // setTimeout(() => {
      //   const system = new StarSystem();
      //   updateStarSystem(starSystem);
      // }, 3000);
    }
  };

  const handleCreate = () => {
    const system = new StarSystem();
    const sun = new Star(1.5, "yellow", 0.03, { x: 0, y: 0.3, z: 0 });
    system.addStar(sun);

    const earth = new Planet(1.25, "blue", 0.01, { x: 0, y: 0.1, z: 0 });
    const mars = new Planet(1, "red", 0.008, { x: 0, y: 0, z: 0 });
    const venus = new Planet(1, "green", 0.007, { x: 0.3, y: 0, z: 0 });

    const earthOrbit = new Orbit(5, earth, 0.01, { x: 0, y: 0.2, z: 0 });
    const marsOrbit = new Orbit(7, mars, 0.008, { x: 0, y: 0, z: 0 });
    const venusOrbit = new Orbit(9, venus, 0.009, { x: 0, y: 0.8, z: 0 });

    system.addOrbit(earthOrbit);
    system.addOrbit(marsOrbit);
    system.addOrbit(venusOrbit);
    updateStarSystem(system);
  };

  return (
    <View style={styles.uiContainer}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.iconButton} onPress={handleCreate}>
          <Earth color="white" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleExplode}>
          <Bomb color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  uiContainer: {
    position: "absolute",
    bottom: 80,
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