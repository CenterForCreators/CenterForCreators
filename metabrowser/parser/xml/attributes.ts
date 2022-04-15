import {isBoolean, isString} from "utils/index";
import {Shadow, Size, XYZ} from "elements/types";
import {parseXmlTriplet} from "parser/xml/util";

export function xyzAttribute(key: string, xmlObject: any, defaultValue: number = 0): XYZ {
  if (!xmlObject[key]) return {x: defaultValue, y: defaultValue, z: defaultValue}

  const [x, y, z] = parseXmlTriplet(xmlObject[key])
  return {
    x: x ? parseFloat(x) : defaultValue,
    y: y ? parseFloat(y) : defaultValue,
    z: z ? parseFloat(z) : defaultValue,
  }
}

export const scale = (xmlObject: any): XYZ => xyzAttribute("@_scale", xmlObject, 1)
export const position = (xmlObject: any): XYZ => xyzAttribute("@_position", xmlObject, 0)
export const rotation = (xmlObject: any): XYZ => xyzAttribute("@_rotation", xmlObject, 0)

export function size(xmlObject: any, defaultValue: number = 0): Size {
  if (!xmlObject["@_size"]) return {width: defaultValue, height: defaultValue, depth: defaultValue}

  const [width, height, depth] = parseXmlTriplet(xmlObject["@_size"])
  return {
    width: width ? parseFloat(width) : defaultValue,
    height: height ? parseFloat(height) : defaultValue,
    depth: depth ? parseFloat(depth) : defaultValue,
  }
}

export function physics(xmlObject: any) {
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

export function shadow(xmlObject: any): Shadow {
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