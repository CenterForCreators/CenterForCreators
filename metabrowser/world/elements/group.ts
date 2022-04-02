import {Element, XYZ, Rotation, Size} from "./element";

export interface IGroup extends Element {
  position: XYZ;
  size: Size;
  rotation: Rotation;
  physics: boolean;
  type: "Group";
}

export class Group implements IGroup {
  position: XYZ = {x: 0, y: 0, z: 0}
  size: Size = {width: 0, height: 0, depth: 0}
  rotation: Rotation = {x: 0, y: 0, z: 0}
  physics: boolean = false
  type: "Group"
}