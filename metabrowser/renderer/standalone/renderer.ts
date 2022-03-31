import {IGlobal} from "../../world/wom";
import { Project, Scene3D, PhysicsLoader, ThirdPersonControls, THREE } from 'enable3d'
import * as Elements from "./elements/index";
import {OrbitControls} from "./controls/OrbitControls";
import {IControls} from "./controls/Controls";
import {Player} from "./player";
import {Background} from "./background";

export function render(global: IGlobal) {
  class MainScene extends Scene3D {
    private controls: IControls;
    private player: Player;
    private background: Background;

    constructor() {
      super({key: 'MainScene'})

      this.player = new Player(this)
      this.background = new Background(this, global)
    }

    init() {
      this.renderer.setPixelRatio(1)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    async preload() {
      await this.player.preload()
      await this.background.preload()
    }

    async create() {
      // set up scene (light, ground, grid, sky, orbitControls)
      // await this.warpSpeed("ground", "light")
      await this.warpSpeed.apply(this, ["ground", "light"])

      const helper = new THREE.GridHelper( 100, 100, 0xff0000, 0xff0000 );
      this.scene.add( helper );


      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      this.background.create()
      await this.player.create()

      const resize = () => {
        const newWidth = window.innerWidth
        const newHeight = window.innerHeight

        this.renderer.setSize(newWidth, newHeight)
        // @ts-ignore
        this.camera.aspect = newWidth / newHeight
        this.camera.updateProjectionMatrix()
      }

      window.onresize = resize
      resize()

      // enable physics debug
      // this.physics.debug.enable()

      // position camera
      this.camera.position.set(10, 10, 20)

      // blue box
      // this.box = this.add.box({ y: 2 }, { lambert: { color: 'deepskyblue' } })

      // pink box
      // this.physics.add.box({ y: 10 }, { lambert: { color: 'hotpink' } })

      // green sphere
      // const geometry = new THREE.SphereGeometry(0.8, 16, 16)
      // const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
      // const cube = new THREE.Mesh(geometry, material)
      // cube.position.set(0.2, 3, 0)
      // this.scene.add(cube)
      // add physics to an existing object
      // @ts-ignore
      // this.physics.add.existing(cube)

      for (let i = 0; i < global.world.rectangles.length; i++) {
        const mesh = Elements.Rectangle.create(global.world.rectangles[i], this)
        global.world.rectangles[i].mesh = mesh
      }

      for (let i = 0; i < global.world.paintings.length; i++) {
        Elements.Painting.create(global.world.paintings[i], this)
      }
    }

    update() {
      this.controls.update()
      this.player.update()

      // need basic world updates.
    }
  }


  PhysicsLoader('/assets/ammo', () => {
    new Project({ scenes: [MainScene], antialias: true })

    // @ts-ignore
    window.metabrowser = global

    // insert global scripts
    global.scripts.forEach((script) => {
      var domScript = document.createElement('script');
      domScript.innerText = script["#text"]
      document.body.appendChild(domScript);
    })

  })
}