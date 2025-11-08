import { Planet } from "./Planet";

export class Orbit {
    public radius: number;
    public planet: Planet;
    public rotation: number;
    public tilt: { x: number; y: number; z: number };
    public rotationSpeed: number;
    
    constructor(radius: number, planet: Planet, rotationSpeed: number = 0.01, tilt: { x: number; y: number; z: number }) {
        this.radius = radius;
        this.planet = planet;
        this.rotation = 0;
        this.rotationSpeed = rotationSpeed;
        this.tilt = tilt;
    }

    animate(): void {

    }
}