import { Planet } from "../objects/Planet";
import { CelestialFactory } from "./CelestialFactory";
import { BaseCelestialFactory } from "./BaseCelestialFactory";
import { getRangFromShape } from "../utils/common";

export class PlanetFactory extends BaseCelestialFactory implements CelestialFactory {
  create(): Planet {
    const shape = this.randomShape();
    const {min, max} = getRangFromShape(shape);
    return new Planet(
      this.randomScale(min * 0.75, max * 0.75),
      this.randomColor(),
      this.randomRotationSpeed(0.001, 0.02),
      this.randomTilt(),
      this.randomShape()
    );
  }
}
