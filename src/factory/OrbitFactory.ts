import { Orbit } from "../objects/Orbit";
import { PlanetFactory } from "./PlanetFactory";
import { randomBetween, randomTilt } from "../utils/common";

export class OrbitFactory {
  private planetFactory: PlanetFactory;

  constructor() {
    this.planetFactory = new PlanetFactory();
  }

  create(): Orbit {
    const planet = this.planetFactory.create();
    const radius = randomBetween(3, 20);
    const rotationSpeed = randomBetween(0.001, 0.02);
    const tilt = randomTilt();

    return new Orbit(radius, planet, rotationSpeed, tilt);
  }
}