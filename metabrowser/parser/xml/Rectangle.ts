import {IRectangle, Rectangle} from "../../WOM/Rectangle";
import {parseXmlTriplet} from "../util";

export function parse(xmlObject): IRectangle {
  let rectangle = new Rectangle()

  if (xmlObject["@_coordinates"]) {
    const [x, y, z] = parseXmlTriplet(xmlObject["@_coordinates"])
    rectangle.coordinates.x = x ? parseFloat(x) : 0
    rectangle.coordinates.y = y ? parseFloat(y) : 0
    rectangle.coordinates.z = z ? parseFloat(z) : 0
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
  
  return rectangle
}