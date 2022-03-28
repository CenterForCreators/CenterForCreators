import {World, IWorld} from "../../WOM/wom";

export function parse (xmlObject): IWorld {
  const wom = new World()
  if (xmlObject["@_background"]) wom.background = xmlObject["@_background"]

  return wom
}