import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
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
  const maxOrbits = 100;
  const starFactory = new StarFactory();
  const orbitFactory = new OrbitFactory();

  const handleExplode = () => {
    if (starSystem) {
      starSystem.explode();
      updateStarSystem(starSystem);
      setTimeout(() => {
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
    <View style={styles.overlay} pointerEvents="box-none">
      <SafeAreaView style={styles.uiContainerText} pointerEvents="box-none">
        <View pointerEvents="none"></View>
        <Text style={styles.counterText}>Number of Planets: {starSystem?.orbits.length}</Text>
      </SafeAreaView>

      <View style={styles.uiContainerButtons} pointerEvents="box-none">
        <View style={styles.buttonRow} pointerEvents="auto">
          <TouchableOpacity style={styles.iconButton} onPress={handleCreate}>
            <Earth color="white" size={24} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleExplode}>
            <Bomb color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: Platform.OS === "android" ? 999 : undefined,
  },
  uiContainerText: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    elevation: Platform.OS === "android" ? 1000 : undefined,
  },
  uiContainerButtons: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    elevation: Platform.OS === "android" ? 1000 : undefined,
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
});