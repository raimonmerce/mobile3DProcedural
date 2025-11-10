import { CelestialObject } from "../objects/CelestialObject";

export interface CelestialFactory {
  create(): CelestialObject;
}
