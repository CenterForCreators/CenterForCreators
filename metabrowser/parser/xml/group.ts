import {parseXmlTriplet} from "parser/util";
import {Group, IGroup} from "world/elements/group";
import {parsePhysics} from "parser/xml/attributes";

export default function(xmlObject): IGroup {
  let object = new Group()

  if (xmlObject["@_position"]) {
    const [x, y, z] = parseXmlTriplet(xmlObject["@_position"])
    object.position.x = x ? parseFloat(x) : 0
    object.position.y = y ? parseFloat(y) : 0
    object.position.z = z ? parseFloat(z) : 0
  }

  if (xmlObject["@_scale"]) {
    const [x, y, z] = parseXmlTriplet(xmlObject["@_scale"])
    object.scale.x = x ? parseFloat(x) : 1
    object.scale.y = y ? parseFloat(y) : 1
    object.scale.z = z ? parseFloat(z) : 1
  }

  if (xmlObject["@_rotation"]) {
    const [x, y, z] = parseXmlTriplet(xmlObject["@_rotation"])
    object.rotation.x = x ? parseFloat(x) : 0
    object.rotation.y = y ? parseFloat(y) : 0
    object.rotation.z = z ? parseFloat(z) : 0
  }

  object.physics = parsePhysics(xmlObject)

  return object
}