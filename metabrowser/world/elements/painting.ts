import {Element, XYZ, Rotation, Size, Physics, Shadow} from "./element";

export interface IPainting extends Element {
  color: string;
  physics?: Physics;
  position: XYZ;
  rotation: Rotation;
  size: Size;
  shadow: Shadow;
  src: string;
  type: "Painting";
}

export class Painting implements IPainting {
  color: ""
  physics: Physics
  position: XYZ = {x: 0, y: 0, z: 0}
  rotation: Rotation = {x: 0, y: 0, z: 0}
  size: Size = {width: 0, height: 0, depth: 0}
  shadow: Shadow = {cast: false, receive: false}
  src: ""
  type: "Painting"
}