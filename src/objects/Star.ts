import { CelestialObject } from "./CelestialObject";

export class Star extends CelestialObject {
    private static readonly SCALE_STAR = 1.5;
    
    constructor(scale: number, color: string, rotationSpeed: number = 0.01, tilt: { x: number; y: number; z: number }) {
        super(scale * Star.SCALE_STAR, color, rotationSpeed, tilt)
    }

    info(): string {
        return "This is the Star of the star system";
    }
}