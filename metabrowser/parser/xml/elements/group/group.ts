import {Group, IGroup} from "elements/group/group";
import {physics, position, rotation, scale} from "parser/xml/attributes";

export default function(xmlObject): IGroup {
  let object = new Group()

  object.position = position(xmlObject)
  object.rotation = rotation(xmlObject)
  object.scale = scale(xmlObject)
  object.physics = physics(xmlObject)

  return object
}