export abstract class CelestialObject {
    public scale: number;
    public color: string;
    public tilt: { x: number; y: number; z: number };
    public rotationSpeed: number; 

    constructor(scale: number, color: string, rotationSpeed: number = 0.01, tilt: { x: number; y: number; z: number }) {
        this.scale = scale;
        this.color = color;
        this.rotationSpeed = rotationSpeed;
        this.tilt = tilt;
    }

    initialAnimation(): void {
        console.log("initialAnimation")
    }

    animate(): void {

    }

    click(): void {
        console.log("click")
    }

    abstract info(): string;
}