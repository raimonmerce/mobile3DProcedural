import { GeometryType } from "../types/types";
import { randomBetween, randomIntBetween, randomTilt } from "../utils/common";

export abstract class BaseCelestialFactory {
  protected colors: string[] = [
    "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff", "#ffa500"
  ];

  protected shapes: GeometryType[] = [
    "icosahedron",
    "dodecahedron",
    "heart",
    "torusknot",
    "torus",
    "box"
  ];

  protected randomColor(): string {
    if (Math.random() > 0.5) {
      return this.colors[randomIntBetween(0, this.colors.length - 1)];
    } else {
      const randomHex = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomHex.padStart(6, "0")}`;
    }
  }

  protected randomTilt(): { x: number; y: number; z: number } {
    return randomTilt();
  }

  protected randomShape(): GeometryType {
    return this.shapes[randomIntBetween(0, this.shapes.length - 1)];
  }

  protected randomScale(min = 0.5, max = 5): number {
    return randomBetween(min, max);
  }

  protected randomRotationSpeed(min = 0.001, max = 0.05): number {
    return randomBetween(min, max);
  }
}
