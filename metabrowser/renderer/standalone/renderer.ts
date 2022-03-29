import {IGlobal} from "../../world/wom";
import { Project, Scene3D, PhysicsLoader, THREE } from 'enable3d'

export function render(global: IGlobal) {
  class MainScene extends Scene3D {
    private box: any;

    constructor() {
      super({key: 'MainScene'})
    }

    init() {
      console.log('init')

      this.renderer.setPixelRatio(1)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    preload() {
      console.log('preload')
    }

    create() {

      // set up scene (light, ground, grid, sky, orbitControls)
      this.warpSpeed("-orbitControls")

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
        let rectangle = global.world.rectangles[i]


        const geometry = new THREE.BoxGeometry( rectangle.size.width, rectangle.size.height, rectangle.size.depth );
        console.log(rectangle.color)
        const material = new THREE.MeshPhongMaterial({color: rectangle.color});
        const mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.x = rectangle.rotation.x
        mesh.rotation.y = rectangle.rotation.y
        mesh.rotation.z = rectangle.rotation.z

        mesh.position.x = rectangle.position.x
        mesh.position.y = rectangle.position.y
        mesh.position.z = rectangle.position.z

        if (rectangle.physics) {
          // @ts-ignore
          this.physics.add.existing(mesh)
        }

        this.scene.add( mesh );
      }



    }

    update() {
      // this.box.rotation.x += 0.01
      // this.box.rotation.y += 0.01
    }
  }


  PhysicsLoader('/assets/ammo', () => new Project({ scenes: [MainScene], antialias: true }))
}