const queryString = require('query-string');
import {parseWml} from "parser";
import {render} from "renderer";
import {Global} from "world/wom";

(async function app() {
  let parsedHash = queryString.parse(location.search);

  const config = {
    example: parsedHash.example || "cubes",
  }

  const res = await fetch(`examples/${config.example}.wml`)
  const wml = await res.text()

  let global = new Global()
  const [world, scripts] = parseWml(wml)

  global.world = world
  global.scripts = scripts

  render(global)
})()
