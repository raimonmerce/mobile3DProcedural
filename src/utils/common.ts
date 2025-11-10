import { 
  BoxGeometry,
  IcosahedronGeometry,
  DodecahedronGeometry,
  Shape,
  ExtrudeGeometry,
  TorusKnotGeometry,
  TorusGeometry,
  Float32BufferAttribute,
  BufferGeometry
} from "three";

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomTilt(): { x: number; y: number; z: number } {
  return {
    x: randomBetween(-1, 1),
    y: randomBetween(-1, 1),
    z: randomBetween(-1, 1)
  };
}

export function getRangFromShape(geometryType: string): {min: number, max: number} {
  switch (geometryType.toLowerCase()) {
    case 'icosahedron':
      return {min: 1.5, max: 1.8};
    case 'dodecahedron':
      return {min: 1.5, max: 1.8};
    case 'heart': 
      return {min: 1.5, max: 1.9};
    case 'torusknot':
      return {min: 1.0, max: 1.5};
    case 'torus':
      return {min: 1.5, max: 1.8};
    case 'star':
      return {min: 1.0, max: 2.0};
    default:
      return {min: 1.5, max: 2.5};
  }
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
    case 'star': {
      const geometry = new BufferGeometry();
      const vertices: number[] = [];
      const faces: number[] = [];

      const numPoints = 5;
      const outerRadius = scale;
      const innerRadius = scale * 0.4;
      const depth = scale * 0.25;

      vertices.push(0, 0, depth);
      vertices.push(0, 0, -depth);


      for (let i = 0; i < numPoints * 2; i++) {
        const angle = (i / (numPoints * 2)) * Math.PI * 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = 0;
        vertices.push(x, y, z);
      }

      for (let i = 0; i < numPoints; i++) {
        let vert = (i * 2) + 2;
        const prev = (vert == 2)? (numPoints * 2) + 1 : vert - 1;
        const next = vert + 1;
        faces.push(prev, vert, 0);
        faces.push(vert, next, 0);
        faces.push(prev, vert, 1);
        faces.push(vert, next, 1);
      }

      geometry.setAttribute(
        'position',
        new Float32BufferAttribute(vertices, 3)
      );
      geometry.setIndex(faces);
      geometry.computeVertexNormals();
      geometry.scale(1.0, 1.0, 1.0);

      return geometry;
    }
    default:
      return new BoxGeometry(scale, scale, scale);
  }
}
