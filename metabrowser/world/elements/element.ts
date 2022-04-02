export interface Element {
  type: string;
}

export interface XYZ {
  x: number;
  y: number;
  z: number;
}

export interface Size {
  width: number;
  height: number;
  depth: number;
}

export interface Rotation {
  x: number;
  y: number;
  z: number;
}

export interface Physics {
  mass: number;
}

export interface Shadow {
  cast: boolean
  receive: boolean
}