import {IPainting, Painting} from "world/elements/painting";
import {parseXmlTriplet} from "parser/util";

export default function(xmlObject): IPainting {
  let object = new Painting()

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

  if (xmlObject["@_physics"]) {
    object.physics = xmlObject["@_physics"]
  }

  if (xmlObject["@_color"]) {
    object.color = xmlObject["@_color"]
  }

  if (xmlObject["@_src"]) {
    object.src = xmlObject["@_src"]
  }
  
  return object
}