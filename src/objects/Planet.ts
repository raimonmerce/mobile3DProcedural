import { CelestialObject } from "./CelestialObject";
import { GeometryType } from "../types/types";

export class Planet extends CelestialObject {
    private static totalPlanets = 0;
    public numberPlanet: number;
    
    constructor(
        scale: number,
        color: string,
        rotationSpeed: number = 0.01,
        tilt: { x: number; y: number; z: number },
        shape: GeometryType
    ) {
        super(scale, color, rotationSpeed, tilt, shape)
        ++Planet.totalPlanets;
        this.numberPlanet = Planet.totalPlanets;
    }

    info(): string {
        return "This is the Planet " + this.numberPlanet + " of the star system";
    }
}