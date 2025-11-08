import { CelestialObject } from "./CelestialObject";

export class Planet extends CelestialObject {
    private static totalPlanets = 0;
    public numberPlanet: number;
    
    constructor(scale: number, color: string, rotationSpeed: number = 0.01, tilt: { x: number; y: number; z: number }) {
        super(scale, color, rotationSpeed, tilt)
        ++Planet.totalPlanets;
        this.numberPlanet = Planet.totalPlanets;
    }

    info(): string {
        return "This is the Planet " + this.numberPlanet + " of the star system";
    }
}