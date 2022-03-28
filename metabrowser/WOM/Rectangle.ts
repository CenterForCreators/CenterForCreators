import {Coordinates, Element, Rotation, Size} from "./Element";

export interface IRectangle extends Element {
  coordinates: Coordinates;
  size: Size;
  rotation: Rotation;
  type: "Rectangle"
}

export class Rectangle implements Element {
  coordinates: Coordinates = {x: 0, y: 0, z: 0}
  size: Size = {width: 0, height: 0, depth: 0}
  rotation: Rotation = {x: 0, y: 0, z: 0}
  type: "Rectangle"
}