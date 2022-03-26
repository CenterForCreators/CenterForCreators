import {parse} from "./parser/parser";
import {render} from "./renderer/renderer";

const world = `
<world>
    <rectangle  
        size=".2, .2, .2"
        rotation="1, 1, 1"
        coordinates="-0.7"
    />
    <rectangle  
        size=".2, .2, .2"
        rotation="1, 1, 1"
        coordinates="0.7"
    />
    <rectangle  
        size=".2, .2, .2"
        rotation=".5, 1, 1"
        coordinates="0.7, .4"
    />
    <rectangle  
        size=".3, .4, .2"
        rotation=".5, 1, 1"
        coordinates="0.7, -.1"
    />
    <rectangle  
        size=".6, .4, .2"
        rotation=".3, 1, 1"
        coordinates="0.7, -.15"
    />
    <rectangle  
        size="1.3, 2, .2"
        rotation=".5, 1, 1"
        coordinates="0.7, -.1"
    />
</world>
`

const WOM = parse(world)
render(WOM)

console.log(WOM)
