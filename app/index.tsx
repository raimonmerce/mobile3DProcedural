import { View } from "react-native";
import MainScene from "./components/ui/mainScene";
import MainUI from "./components/ui/mainUI";
import { StarSystem} from "../src/objects/StarSystem";
import { Star} from "../src/objects/Star";
import { Planet} from "../src/objects/Planet";
import { Orbit} from "../src/objects/Orbit";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";

interface StarSystemData {
  star?: {
    scale: number;
    color: string;
    rotationSpeed: number;
    tilt: { x: number; y: number; z: number };
    exploding: boolean;
  } | null;
  orbits: {
    radius: number;
    rotationSpeed: number;
    tilt: { x: number; y: number; z: number };
    planet: {
      scale: number;
      color: string;
      rotationSpeed: number;
      tilt: { x: number; y: number; z: number };
      exploding: boolean;
    };
  }[];
}

export default function Home() {
  const { starSystem, updateStarSystem } = useStore();
  const [localSystem, setLocalSystem] = useState<StarSystem | null>(null);

  useEffect(() => {
    if (!starSystem) {
      const system = new StarSystem();
      updateStarSystem(system); 
      setLocalSystem(system);
    } else {
      if (!(starSystem instanceof StarSystem)) {
        const data = starSystem as unknown as StarSystemData;
        const s = new StarSystem();

        if (data.star) {
          const st = data.star;
          const star = new Star(st.scale, st.color, st.rotationSpeed, st.tilt);
          star.exploding = st.exploding;
          s.addStar(star);
        }

        data.orbits.forEach((o: any) => {
          const p = o.planet;
          const planet = new Planet(p.scale, p.color, p.rotationSpeed, p.tilt);
          planet.exploding = p.exploding;
          s.addOrbit(new Orbit(o.radius, planet, o.rotationSpeed, o.tilt));
        });

        setLocalSystem(s);
        updateStarSystem(s);
      } else {
        setLocalSystem(starSystem);
      }
    }
  }, [starSystem]);
  

  return (
    <View style={{ flex: 1 }}>
      <MainScene starSystem={localSystem}/>
      <MainUI starSystem={localSystem}/>
    </View>
  );
}
