import {parseXmlTriplet} from "parser/util";
import {parseShadow} from "parser/xml/attributes";
import {ISpotlight, Spotlight} from "world/elements/lights";

export function spotlight(xmlObject): ISpotlight {
  let object = new Spotlight()

  if (xmlObject["@_position"]) {
    const [x, y, z] = parseXmlTriplet(xmlObject["@_position"])
    object.position.x = x ? parseFloat(x) : 0
    object.position.y = y ? parseFloat(y) : 0
    object.position.z = z ? parseFloat(z) : 0
  }

  object.shadow = parseShadow(xmlObject)

  if (xmlObject["@_intensity"]) {
    object.intensity = xmlObject["@_intensity"]
  }

  if (xmlObject["@_color"]) {
    object.color = xmlObject["@_color"]
  }

  if (xmlObject["@_debug"]) {
    object.debug = xmlObject["@_debug"]
  }
  
  return object
}