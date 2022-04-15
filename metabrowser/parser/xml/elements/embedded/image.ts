import {IImage, Image} from "elements/embedded/image";
import {physics, shadow, size, position, rotation} from "parser/xml/attributes";

export default function(xmlObject): IImage {
  let object = new Image()

  object.position = position(xmlObject)
  object.rotation = rotation(xmlObject)
  object.size = size(xmlObject)
  object.physics = physics(xmlObject)
  object.shadow = shadow(xmlObject)

  if (xmlObject["@_color"]) {
    object.color = xmlObject["@_color"]
  }

  if (xmlObject["@_src"]) {
    object.src = xmlObject["@_src"]
  }
  
  return object
}