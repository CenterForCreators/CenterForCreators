import {IRectangle, Rectangle} from "elements/shapes/rectangle";
import {physics, shadow, size, position, rotation} from "parser/xml/attributes";

export default function (xmlObject): IRectangle {
  let object = new Rectangle()

  object.position = position(xmlObject)
  object.rotation = rotation(xmlObject)
  object.size = size(xmlObject)
  object.physics = physics(xmlObject)
  object.shadow = shadow(xmlObject)

  if (xmlObject["@_color"]) {
    object.color = xmlObject["@_color"]
  }
  
  return object
}