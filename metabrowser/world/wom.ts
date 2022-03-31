import {IRectangle} from "./rectangle";
import {IPainting} from "./painting";
import {Skybox} from "./skybox";

// The global object - equivalent to "window" in browsers, or "process" in node
export interface IGlobal {
  world: IWorld
  scripts: Array<any>
  getElementById: (string) => any
}

export class Global implements IGlobal {
  scripts: Array<any> = [];
  world: IWorld = {
    background: "",
    skybox: "",
    rectangles: [],
    paintings: [],
  };
  getElementById(id) {
    return {
      wow: "cool",
      id
    }
  }
}

// The world object model, equivalent to "window.document".
export interface IWorld {
  background: string
  skybox: string
  rectangles: Array<IRectangle>
  paintings: Array<IPainting>
}

export class World implements IWorld {
  skybox: string = ""
  background: string = ""
  rectangles: Array<IRectangle> = []
  paintings: Array<IPainting> = []
}