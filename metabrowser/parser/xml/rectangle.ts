import {IRectangle, Rectangle} from "world/elements/rectangle";
import {parseXmlTriplet} from "parser/util";

export default function (xmlObject): IRectangle {
  let rectangle = new Rectangle()

  if (xmlObject["@_position"]) {
    const [x, y, z] = parseXmlTriplet(xmlObject["@_position"])
    rectangle.position.x = x ? parseFloat(x) : 0
    rectangle.position.y = y ? parseFloat(y) : 0
    rectangle.position.z = z ? parseFloat(z) : 0
  }

  if (xmlObject["@_size"]) {
    const [width, height, depth] = parseXmlTriplet(xmlObject["@_size"])
    rectangle.size.width = width ? parseFloat(width) : 0
    rectangle.size.height = height ? parseFloat(height) : 0
    rectangle.size.depth = depth ? parseFloat(depth) : 0
  }

  if (xmlObject["@_rotation"]) {
    const [x, y, z] = parseXmlTriplet(xmlObject["@_rotation"])
    rectangle.rotation.x = x ? parseFloat(x) : 0
    rectangle.rotation.y = y ? parseFloat(y) : 0
    rectangle.rotation.z = z ? parseFloat(z) : 0
  }

  if (xmlObject["@_physics"]) {
    rectangle.physics = xmlObject["@_physics"]
  }

  if (xmlObject["@_color"]) {
    rectangle.color = xmlObject["@_color"]
  }
  
  return rectangle
}