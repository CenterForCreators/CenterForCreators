import {Element, Position, Rotation, Size} from "./element";

export interface IRectangle extends Element {
  position: Position;
  size: Size;
  rotation: Rotation;
  physics: boolean;
  color: string;
  type: "Rectangle";
  mesh: any
}

export class Rectangle implements IRectangle {
  position: Position = {x: 0, y: 0, z: 0}
  size: Size = {width: 0, height: 0, depth: 0}
  rotation: Rotation = {x: 0, y: 0, z: 0}
  physics: boolean = false
  color: ""
  type: "Rectangle"
  mesh: null
}