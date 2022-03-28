import {parseWml} from "./parser/parser";
import {render} from "./renderer/renderer";
import {Global} from "./WOM/wom";

(async function app() {
  const res = await fetch('examples/rectangles.wml')
  const wml = await res.text()
  let global = new Global()
  global.world = parseWml(wml)
  render(global)
})()
