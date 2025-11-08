import "react";
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      meshStandardMaterial: any;
      group: any;
      mesh: any;
      sphereGeometry: any;
    }
  }
}