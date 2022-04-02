import {XMLParser} from 'fast-xml-parser'
// import {parse as parseWorld} from "parser/xml/World";
import {World, IWorld} from "world/wom";
import {isArray, isObject} from "utils/index";
import * as Parsers from 'parser/xml'
const elTypes = Object.keys(Parsers)

// parseWml: Take a World Markup Language string and convert to an initialized World object.
export function parseWml(worldString: string): [IWorld, Array<any>] {
  const parser = new XMLParser({
    ignoreAttributes : false,
    allowBooleanAttributes: true,
  });

  const worldObjectXml = parser.parse(worldString);
  const worldXml = worldObjectXml["world"]

  // parse world root node
  let world = parseWorld(worldXml)

  return [world, []]
}

export function parseWorld (xmlObject): IWorld {
  const wom = new World()
  wom.contents = processNode(xmlObject, "world")
  return wom
}

// parse a node and recursively parse it's children.
function processNode(node: any, type: string) {
  let children = []
  let props = {}

  if (Parsers[type]) {
    props = Parsers[type](node)
  }

  Object.keys(node).filter((key) => elTypes.includes(key)).forEach((key) => {
    const item = node[key]

    if (isObject(item)) {
      children = [...children, {...item, ...{type: key}}]
    } else if (isArray(item)) {
      children = [...children, ...item.map((g) => ({...g, type: key}))]
    }
  })

  children = children.map((child) => {
    return processNode(child, child.type)
  })

  return {
    children,
    type,
    props
  }
}