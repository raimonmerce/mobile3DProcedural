import { 
  BoxGeometry,
  IcosahedronGeometry,
  DodecahedronGeometry,
  Shape,
  ExtrudeGeometry,
  TorusKnotGeometry,
  TorusGeometry
} from "three";

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getGeometry(geometryType: string, scale: number) {
  switch (geometryType.toLowerCase()) {
    case 'icosahedron':
      return new IcosahedronGeometry(scale);
    case 'dodecahedron':
      return new DodecahedronGeometry(scale);
    case 'heart': {
      const shape = new Shape();
      const x = -2.5;
      const y = -5;
      shape.moveTo(x + 2.5, y + 2.5);
      shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
      shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
      shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
      shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
      shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
      shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

      const extrudeSettings = {
        steps: 1,
        depth: 1.0,
        bevelEnabled: true,
        bevelThickness: 1.49,
        bevelSize: 1.84,
        bevelSegments: 3,
      };
        const geometry = new ExtrudeGeometry(shape, extrudeSettings);
        geometry.scale(0.2, 0.2, 0.2);
        geometry.rotateX(-Math.PI/2)
        return geometry;
    }
    case 'torusknot':
      return new TorusKnotGeometry(scale, scale * 0.3, 100, 16);
    case 'torus':
      return new TorusGeometry(scale, scale * 0.3, 16, 100);
    default:
      return new BoxGeometry(scale, scale, scale);
  }
}
