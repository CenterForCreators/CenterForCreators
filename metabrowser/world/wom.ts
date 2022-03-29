import {IRectangle} from "./rectangle";
import {Skybox} from "./skybox";

// The global object - equivalent to "window" in browsers, or "process" in node
export interface IGlobal {
  world: IWorld
}

export class Global implements IGlobal {
  world: IWorld = {
    background: "",
    rectangles: [],
  };
}

// The world object model, equivalent to "window.document".
export interface IWorld {
  background: string
  skybox?: Skybox
  rectangles: Array<IRectangle>
}

export class World implements IWorld {
  skybox?: Skybox
  background: string = ""
  rectangles: Array<IRectangle> = []
}