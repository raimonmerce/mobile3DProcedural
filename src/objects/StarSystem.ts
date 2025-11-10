import { Star } from "./Star";
import { Orbit } from "./Orbit";

export class StarSystem {
    public star: Star | null = null;
    public orbits: Orbit[] = [];
    public exploded = false;
    
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
    
    explode() : void {
        if (!this.star) return;
        this.exploded = true;
        this.star.exploding = true;
        this.orbits.forEach((orbit) => {
            orbit.explode();
        });
    }
}