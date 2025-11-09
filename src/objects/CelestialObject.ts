import { animated, useSpring } from "@react-spring/three";
import { useRef, useState } from "react";
import { Mesh } from "three";

export abstract class CelestialObject {
    public scale: number;
    public color: string;
    public tilt: { x: number; y: number; z: number };
    public rotationSpeed: number; 
    public exploding = false;

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
        console.log(this.info())
    }

    abstract info(): string;
}