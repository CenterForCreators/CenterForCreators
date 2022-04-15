const queryString = require('query-string');
import {parse} from "parser/xml";
import {render} from "renderer";
import {Global} from "elements/world/world";

(async function app() {
  let parsedHash = queryString.parse(location.search);

  const config = {
    example: parsedHash.example || "cubes",
  }

  const res = await fetch(`examples/${config.example}.wml`)
  const xml = await res.text()

  let global = new Global()
  const [world, scripts] = parse(xml)

  global.world = world
  global.scripts = scripts

  console.log(global)

  render(global)
})()
