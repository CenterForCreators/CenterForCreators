import {IGlobal} from "../../world/wom";
import * as Phaser from 'phaser'
import { enable3d, Canvas, Scene3D } from '@enable3d/phaser-extension'

class MainScene extends Scene3D {
  global: IGlobal

  constructor(global: IGlobal) {
    super({ key: 'MainScene' })

    this.global = global
  }

  init() {
    this.accessThirdDimension()

    const DPR = window.devicePixelRatio
    this.third.renderer.setPixelRatio(Math.min(2, DPR))
  }

  async create() {

    // creates a nice scene
    const { camera, ground, lights, orbitControls } = await this.third.warpSpeed()

    // adds a box
    this.third.physics.add.box({ x: 1, y: 2 })
    this.third.physics.add.plane({ x: 1, y: 2, z: 3 })

    console.log(ground.scale.set(25, 50, 1))

    // ground.

    this.third.physics.add.box(
      { name: 'blueBox', x: 0.5, y: 15, z: 1.1, depth: 3 },
      { lambert: { color: 0x0000ff } }
    )

    // adds a box with physics
    // this.third.physics.add.box({ x: -1, y: 2 })

    // throws some random object on the scene
    // this.third.haveSomeFun()
  }

  update() {}
}

export function render(global: IGlobal) {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    transparent: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: window.innerWidth,
      height: window.innerHeight
    },
    scene: [new MainScene(global)],
    ...Canvas({antialias: true})
  }

  enable3d(() => {
    const game = new Phaser.Game(config)
  }).withPhysics('/assets/ammo')
}