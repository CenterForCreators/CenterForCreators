import {XMLParser} from 'fast-xml-parser'
import {World, IWorld} from "elements/world/world";
import {isArray, isObject, isString} from "utils/index";
import * as Parsers from 'parser/xml/elements'
const elTypes = Object.keys(Parsers)

// parseWml: Take a World Markup Language string and convert to an initialized World object.
export function parse(worldString: string): [IWorld, Array<any>] {
  const parser = new XMLParser({
    ignoreAttributes : false,
    allowBooleanAttributes: true,
  });

  const worldObjectXml = parser.parse(worldString);
  const worldXml = worldObjectXml["world"]

  const wom = new World()
  wom.contents = processNode(worldXml, "world")

  return [wom, []]  // TODO: Add scripts here.
}

// parse a node and recursively parse its children.
function processNode(node: any, type: string) {
  let children = []
  let props = {}

  if (Parsers[type]) {
    props = Parsers[type](node)
  }

  Object.keys(node).filter((key) => elTypes.includes(key)).forEach((key) => {
    const item = node[key]

    if (isString(item)) {
      children = [...children, {type: key}]
    }
    else if (isObject(item)) {
      children = [...children, {...item, ...{type: key}}]
    }
    else if (isArray(item)) {
      children = [...children, ...item.map((g) => ({...g, type: key}))]
    }
  })

  children = children.map((child) => {
    return processNode(child, child.type)
  })

  return {
    children,
    type,
    ...props
  }
}