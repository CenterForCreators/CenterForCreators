import {Element, XYZ, Rotation, Size, Physics, Shadow} from "elements/types";

export interface IRectangle extends Element {
  position: XYZ;
  size: Size;
  rotation: Rotation;
  physics?: Physics;
  shadow: Shadow;
  color: string;
  type: "Rectangle";
  mesh: any
}

export class Rectangle implements IRectangle {
  position: XYZ = {x: 0, y: 0, z: 0}
  size: Size = {width: 0, height: 0, depth: 0}
  rotation: Rotation = {x: 0, y: 0, z: 0}
  physics: Physics
  shadow: Shadow = {cast: false, receive: false}
  color: ""
  type: "Rectangle"
  mesh: null
}