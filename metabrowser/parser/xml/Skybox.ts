import {ISkybox, Skybox} from "../../WOM/Skybox";

export function parse(xmlObject): ISkybox {
  let skybox = new Skybox()

  if (xmlObject["@_src"]) {
    skybox.src = xmlObject["@_src"]
  }

  return skybox
}