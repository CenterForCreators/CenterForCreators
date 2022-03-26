export interface Element {
  type: string;
}

export interface Coordinates {
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

export interface IRectangle extends Element {
  coordinates: Coordinates;
  size: Size;
  rotation: Rotation;
  type: "Rectangle"
}

export class Rectangle {
  coordinates: Coordinates = {x: 0, y: 0, z: 0}
  size: Size = {width: 0, height: 0, depth: 0}
  rotation: Rotation = {x: 0, y: 0, z: 0}

  constructor() {}

  parseFromXmlObject(xmlObject: object): Rectangle {
    console.log(xmlObject)

    if (xmlObject["@_coordinates"]) {
      const [x, y, z] = parseXmlTriplet(xmlObject["@_coordinates"])
      this.coordinates.x = x ? parseFloat(x) : 0
      this.coordinates.y = y ? parseFloat(y) : 0
      this.coordinates.z = z ? parseFloat(z) : 0
    }

    if (xmlObject["@_size"]) {
      const [width, height, depth] = parseXmlTriplet(xmlObject["@_size"])
      this.size.width = width ? parseFloat(width) : 0
      this.size.height = height ? parseFloat(height) : 0
      this.size.depth = depth ? parseFloat(depth) : 0
    }

    if (xmlObject["@_rotation"]) {
      const [x, y, z] = parseXmlTriplet(xmlObject["@_rotation"])
      this.rotation.x = x ? parseFloat(x) : 0
      this.rotation.y = y ? parseFloat(y) : 0
      this.rotation.z = z ? parseFloat(z) : 0
    }

    return this
  }
}

function parseXmlTriplet(xmlTriplet: string): Array<string | undefined> {
  let tokens = xmlTriplet
    .split(",")
    .map((token) => token.trim())

  return [tokens[0], tokens[1], tokens[2]]
}