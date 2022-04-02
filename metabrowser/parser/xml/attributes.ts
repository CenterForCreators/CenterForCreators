import {isBoolean, isString} from "utils/index";
import {Shadow} from "world/elements/element";

export function parsePhysics(xmlObject: any) {
  const value = xmlObject["@_physics"]

  if (isBoolean(value)) {
    return {
      mass: 1,
    }
  }

  if (isString(value)) {
    return {
      mass: parseInt(value),
    }
  }

  return null
}

export function parseShadow(xmlObject: any): Shadow {
  const value = xmlObject["@_shadow"]

  if (isBoolean(value)) {
    return {
      cast: true,
      receive: true
    }
  }

  if (isString(value)) {
    return {
      cast: value.includes("cast"),
      receive: value.includes("receive")
    }
  }

  return {
    cast: false,
    receive: false
  }
}