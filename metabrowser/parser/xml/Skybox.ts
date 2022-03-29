import {ISkybox, Skybox} from "../../world/Skybox";

export function parse(xmlObject): ISkybox {
  let skybox = new Skybox()

  if (xmlObject["@_src"]) {
    skybox.src = xmlObject["@_src"]
  }

  return skybox
}