import {Rectangle} from "../WOM/Element";
import {XMLParser} from 'fast-xml-parser'
import {isObject, isArray} from '../utils'

export function parse(world: string): Array<Rectangle> {
  const parser = new XMLParser({
    ignoreAttributes : false,
    allowBooleanAttributes: true,
  });
  const worldObject = parser.parse(world);
  const root = worldObject["world"]
  let WOM: Array<Rectangle> = []

  let rectangles = []

  if (isObject(root.rectangle)) {
    rectangles = [root.rectangle]
  }

  if (isArray(root.rectangle)) {
    rectangles = root.rectangle
  }

  for (let i = 0; i < rectangles.length; i++) {
    let xmlObject = rectangles[i]
    let rectangle = new Rectangle().parseFromXmlObject(xmlObject)
    WOM.push(rectangle)
  }

  return WOM
}