const queryString = require('query-string');
import {parseWml} from "./parser/parser";
import {renderers} from "./renderer/load";
import {Global} from "./world/wom";

(async function app() {
  const render = renderers["standalone"].render

  let parsedHash = queryString.parse(location.search);

  const config = {
    example: parsedHash.example || "cubes",
    controls: parsedHash.controls || "orbital",
  }

  const res = await fetch(`examples/${config.example}.wml`)
  const wml = await res.text()
  let global = new Global()
  const [world, scripts] = parseWml(wml)
  global.world = world
  global.scripts = scripts

  render(global)
})()
