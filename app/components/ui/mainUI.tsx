import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useStore } from "../../../store/useStore";
import { Earth, Bomb } from "lucide-react-native";
import { StarSystem} from "../../../src/objects/StarSystem";
import { StarFactory } from "../../../src/factory/StarFactory";
import { OrbitFactory } from "../../../src/factory/OrbitFactory";

interface MainUIProps {
  starSystem: StarSystem | null;
}

export default function MainUI({ starSystem }: MainUIProps) {
  const { updateStarSystem } = useStore();
  const maxOrbits = 16;
  const starFactory = new StarFactory();
  const orbitFactory = new OrbitFactory();

  const handleExplode = () => {
    if (starSystem) {
      starSystem.explode();
      updateStarSystem(starSystem);
      const timeout = setTimeout(() => {
        starSystem = new StarSystem();
        updateStarSystem(starSystem);
      }, 3000);
      
    }
  };

  const handleCreate = () => {
    if (!starSystem || starSystem.exploded) starSystem = new StarSystem();
    if (!starSystem.star) starSystem.addStar(starFactory.create());
    else if (starSystem.orbits.length < maxOrbits) starSystem.addOrbit(orbitFactory.create());
    updateStarSystem(starSystem);
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