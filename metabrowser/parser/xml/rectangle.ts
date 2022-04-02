import {IRectangle, Rectangle} from "world/elements/rectangle";
import {parseXmlTriplet} from "parser/util";
import {parsePhysics, parseShadow} from "parser/xml/attributes";

export default function (xmlObject): IRectangle {
  let object = new Rectangle()

  if (xmlObject["@_position"]) {
    const [x, y, z] = parseXmlTriplet(xmlObject["@_position"])
    object.position.x = x ? parseFloat(x) : 0
    object.position.y = y ? parseFloat(y) : 0
    object.position.z = z ? parseFloat(z) : 0
  }

  if (xmlObject["@_size"]) {
    const [width, height, depth] = parseXmlTriplet(xmlObject["@_size"])
    object.size.width = width ? parseFloat(width) : 0
    object.size.height = height ? parseFloat(height) : 0
    object.size.depth = depth ? parseFloat(depth) : 0
  }

  if (xmlObject["@_rotation"]) {
    const [x, y, z] = parseXmlTriplet(xmlObject["@_rotation"])
    object.rotation.x = x ? parseFloat(x) : 0
    object.rotation.y = y ? parseFloat(y) : 0
    object.rotation.z = z ? parseFloat(z) : 0
  }

  object.physics = parsePhysics(xmlObject)
  object.shadow = parseShadow(xmlObject)

  if (xmlObject["@_color"]) {
    object.color = xmlObject["@_color"]
  }
  
  return object
}