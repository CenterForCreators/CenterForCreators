import {parseXmlTriplet} from "parser/xml/util";
import {physics, shadow, size, position, rotation} from "parser/xml/attributes";
import {ISpotlight, Spotlight} from "elements/lights/spotlight";

export default function (xmlObject): ISpotlight {
  let object = new Spotlight()

  object.position = position(xmlObject)
  object.shadow = shadow(xmlObject)

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