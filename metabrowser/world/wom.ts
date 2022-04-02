// The global object - equivalent to "window" in browsers, or "process" in node
export interface IGlobal {
  world: IWorld
  scripts: Array<any>
  getElementById: (string) => any
}

export class Global implements IGlobal {
  scripts: Array<any> = [];
  world: IWorld = {
    contents: {}
  };
  getElementById(id) {
    return {
      wow: "cool",
      id
    }
  }
}

export interface IWorldProps {
  background: string;
  skybox: string;
  grid: boolean;
  debug: boolean;
  dark: boolean;
}

// The world object model, equivalent to "window.document".
export interface IWorld {
  contents: Object
}

export class World implements IWorld {
  contents: {}
}