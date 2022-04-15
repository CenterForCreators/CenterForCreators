import {Element, Shadow, XYZ} from "elements/types";

export interface ISpotlight extends Element {
  color: string;
  debug?: string
  intensity: number;
  position: XYZ;
  shadow: Shadow;
  type: "Spotlight";
}

export class Spotlight implements ISpotlight {
  color: "white"
  debug: string
  intensity: number = 1
  position: XYZ = {x: 5, y: 5, z: 5}
  shadow: Shadow = {cast: true, receive: false}
  type: "Spotlight"
}