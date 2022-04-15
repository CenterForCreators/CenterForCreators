import {Element, XYZ, Physics} from "elements/types";

export interface IGroup extends Element {
  position: XYZ;
  scale: XYZ;
  rotation: XYZ;
  physics?: Physics;
  type: "Group";
}

export class Group implements IGroup {
  position: XYZ = {x: 0, y: 0, z: 0}
  scale: XYZ = {x: 1, y: 1, z: 1}
  rotation: XYZ = {x: 0, y: 0, z: 0}
  physics: Physics
  type: "Group"
}