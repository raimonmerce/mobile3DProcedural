import { GeometryType } from "../types/types";

export abstract class CelestialObject {
    public scale: number;
    public color: string;
    public tilt: { x: number; y: number; z: number };
    public rotationSpeed: number; 
    public exploding = false;
    public shape: GeometryType;

    constructor(
        scale: number,
        color: string, 
        rotationSpeed: number = 0.01,
        tilt: { x: number; y: number; z: number },
        shape: GeometryType
    ) {
        this.scale = scale;
        this.color = color;
        this.rotationSpeed = rotationSpeed;
        this.tilt = tilt;
        this.shape = shape;
    }

    initialAnimation(): void {
        console.log("initialAnimation")
    }

    animate(): void {

    }

    click(): void {
        console.log(this.info())
    }

    abstract info(): string;
}