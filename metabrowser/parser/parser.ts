import {XMLParser} from 'fast-xml-parser'
import {isObject, isArray} from '../utils'
import {parse as parseWorld} from "./xml/World";
import {parse as parseRectangle} from "./xml/Rectangle";
import {parse as parseSkybox} from "./xml/Skybox";
import {IWorld} from "../WOM/wom";

// parseWml: Take a World Markup Language string and convert to an initialized World object.
export function parseWml(worldString: string): IWorld {
  const parser = new XMLParser({
    ignoreAttributes : false,
    allowBooleanAttributes: true,
  });

  const worldObjectXml = parser.parse(worldString);
  const worldXml = worldObjectXml["world"]

  // parse world root node
  let world = parseWorld(worldXml)

  // This needs to be more fluid for new types.
  let xmlRectangles = []

  if (isObject(worldXml.rectangle)) {
    xmlRectangles = [worldXml.rectangle]
  }

  if (isArray(worldXml.rectangle)) {
    xmlRectangles = worldXml.rectangle
  }

  for (let i = 0; i < xmlRectangles.length; i++) {
    let xmlObject = xmlRectangles[i]
    world.rectangles.push(parseRectangle(xmlObject))
  }

  // skybox
  if (isObject(worldXml.skybox)) {
    world.skybox = parseSkybox(worldXml.skybox)
  }

  return world
}
