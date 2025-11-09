import { CelestialObject } from "./CelestialObject";
import { GeometryType } from "../types/types";

export class Star extends CelestialObject {
    
    constructor(
        scale: number,
        color: string,
        rotationSpeed: number = 0.01,
        tilt: { x: number; y: number; z: number },
        shape: GeometryType
    ) {
        super(scale, color, rotationSpeed, tilt, shape)
    }

    info(): string {
        return "This is the Star of the star system";
    }
}