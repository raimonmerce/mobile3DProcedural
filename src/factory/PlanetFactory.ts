import { Planet } from "../objects/Planet";
import { CelestialFactory } from "./CelestialFactory";
import { BaseCelestialFactory } from "./BaseCelestialFactory";

export class PlanetFactory extends BaseCelestialFactory implements CelestialFactory {
  create(): Planet {
    return new Planet(
      this.randomScale(0.5, 1.5),
      this.randomColor(),
      this.randomRotationSpeed(0.005, 0.05),
      this.randomTilt(),
      this.randomShape()
    );
  }
}
