import { Star } from "./Star";
import { Orbit } from "./Orbit";

export class StarSystem {
    public star: Star | null = null;
    public orbits: Orbit[] = [];
    
    constructor() {}

    addStar(star: Star) {
        this.star = star;
    }

    addOrbit(orbit: Orbit): void {
        this.orbits.push(orbit)
    }

    restartStarSystem() : void {
        this.star = null;
        this.orbits = [];
    }    
}