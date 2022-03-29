import {render as threeRender} from "./three/renderer";
import {render as threeAmmoRender} from "./three-ammo/renderer";
import {render as phaserRender} from "./phaser/renderer";
import {render as standaloneRender} from "./standalone/renderer";

export const renderers = {
  "three": {
    render: threeRender
  },
  "three-ammo": {
    render: threeAmmoRender
  },
  "phaser": {
    render: phaserRender
  },
  "standalone": {
    render: standaloneRender
  },
}
