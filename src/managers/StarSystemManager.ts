import { Star } from "../objects/Star";
import { Orbit } from "../objects/Orbit";
import { Planet } from "../objects/Planet";
import { StarSystem } from "../objects/StarSystem";

export class StarSystemManager {
  private system: StarSystem;

  constructor(){
    this.system = new StarSystem()
  }

  addStart(scale: number, color: string, rotationSpeed: number, tilt: { x: number; y: number; z: number }) {
    const star = new Star( scale, color, rotationSpeed, tilt);
    this.system.addStar(star);
  }

  addPlanetOrbit(
    planet: Planet,
    radius: number,
    rotationSpeed: number = 0.01,
    tilt: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
  ) {
    const orbit = new Orbit(radius, planet, rotationSpeed, tilt);
    this.system.addOrbit(orbit);
  }

  getSystem(): StarSystem {
    return this.system;
  }
}
