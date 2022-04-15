import {IWorldProps} from "elements/world/world";

export default function (xmlObject): IWorldProps {
  return {
    background: xmlObject["@_background"],
    skybox: xmlObject["@_skybox"],
    grid: !!xmlObject["@_grid"],
    debug: !!xmlObject["@_debug"],
    dark: !!xmlObject["@_dark"],
  }
}