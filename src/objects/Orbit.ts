import { Planet } from "./Planet";

export class Orbit {
    public radius: number;
    public planet: Planet;
    public rotation = 0;
    public tilt: { x: number; y: number; z: number };
    public rotationSpeed: number;
    public exploding = false;
    
    constructor(radius: number, planet: Planet, rotationSpeed: number = 0.01, tilt: { x: number; y: number; z: number }) {
        this.radius = radius;
        this.planet = planet;
        this.rotationSpeed = rotationSpeed;
        this.tilt = tilt;
    }

    animate(): void {

    }

    explode(): void {
        this.exploding = true;
        this.planet.exploding = true;
    }
}