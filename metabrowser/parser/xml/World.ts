import {World, IWorld} from "../../world/wom";

export function parse (xmlObject): IWorld {
  const wom = new World()
  if (xmlObject["@_background"]) wom.background = xmlObject["@_background"]

  if (xmlObject["@_skybox"]) wom.skybox = xmlObject["@_skybox"]

  return wom
}