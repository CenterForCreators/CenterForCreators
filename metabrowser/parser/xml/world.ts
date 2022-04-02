import {IWorldProps} from "world/wom";

export default function (xmlObject): IWorldProps {
  return {
    background: xmlObject["@_background"],
    skybox: xmlObject["@_skybox"],
    grid: !!xmlObject["@_grid"],
    debug: !!xmlObject["@_debug"],
    dark: !!xmlObject["@_dark"],
  }
}