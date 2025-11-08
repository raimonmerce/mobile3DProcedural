import { CelestialObject } from "./CelestialObject";

export class Star extends CelestialObject {
    
    constructor(scale: number, color: string, rotationSpeed: number = 0.01, tilt: { x: number; y: number; z: number }) {
        super(scale, color, rotationSpeed, tilt)
    }

    info(): string {
        return "This is the Star of the star system";
    }
}