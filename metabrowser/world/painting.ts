import {Element, Position, Rotation, Size} from "./element";

export interface IPainting extends Element {
  position: Position;
  size: Size;
  rotation: Rotation;
  physics: boolean;
  color: string;
  src: string;
  type: "Painting";
}

export class Painting implements IPainting {
  position: Position = {x: 0, y: 0, z: 0}
  size: Size = {width: 0, height: 0, depth: 0}
  rotation: Rotation = {x: 0, y: 0, z: 0}
  physics: boolean = false
  color: ""
  src: ""
  type: "Painting"
}