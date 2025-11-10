import { Star } from "../objects/Star";
import { CelestialFactory } from "./CelestialFactory";
import { BaseCelestialFactory } from "./BaseCelestialFactory";
import { getRangFromShape } from "../utils/common";

export class StarFactory extends BaseCelestialFactory implements CelestialFactory {
  create(): Star {
    const shape = this.randomShape();
    const {min, max} = getRangFromShape(shape);
    return new Star(
      this.randomScale(min, max),
      this.randomColor(),
      this.randomRotationSpeed(0.001, 0.02),
      this.randomTilt(),
      this.randomShape()
    );
  }
}
