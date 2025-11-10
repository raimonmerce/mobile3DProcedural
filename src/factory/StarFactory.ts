import { Star } from "../objects/Star";
import { CelestialFactory } from "./CelestialFactory";
import { BaseCelestialFactory } from "./BaseCelestialFactory";

export class StarFactory extends BaseCelestialFactory implements CelestialFactory {
  create(): Star {
    return new Star(
      this.randomScale(1.5, 2.5),
      this.randomColor(),
      this.randomRotationSpeed(0.001, 0.02),
      this.randomTilt(),
      this.randomShape()
    );
  }
}
