import {IGlobal} from "elements/world/world";
import { Project, Scene3D, PhysicsLoader, THREE } from 'enable3d'
import * as Elements from "renderer/elements/index";
import {OrbitControls} from "renderer/controls/OrbitControls";
import {IControls} from "renderer/controls/types";
import {Player} from "renderer/player";
import crawl from 'tree-crawl'

export function render(global: IGlobal) {
  class MainScene extends Scene3D {
    private controls: IControls;
    private player: Player;
    private raycaster: THREE.Raycaster;
    private pointer: THREE.Vector2;
    private intersected: any;

    constructor() {
      super({key: 'MainScene'})

      this.player = new Player(this)
    }

    init() {
      this.renderer.setPixelRatio(1)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.pointer = new THREE.Vector2();
      // document.addEventListener( 'mousemove', (e) => this.onPointerMove(e) );
    }

    onPointerMove(e) {
      this.pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      this.pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    }

    async preload() {
      await this.player.preload()
    }

    async create() {
      this.raycaster = new THREE.Raycaster();

      const box = this.physics.add.box({
        x: 0, y: -50.5, z: 0,
        width: 500,
        height: 100.5,
        depth: 500,
        mass: 0
      }, { phong: { color: 'white' } })
      // box.body.setCollisionFlags(2)
      box.receiveShadow = true
      box.castShadow = true

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

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

      // position camera
      this.camera.position.set(0, 3, 10)

      // Crawl and build meshes.
      crawl(global.world.contents, (node: any, context) => {
        if (node.type === "rectangle") {
          const mesh = Elements.Rectangle.create(node, this)
          node.mesh = mesh
        }
        if (node.type === "image") {
          const mesh = Elements.Image.create(node, this)
          node.mesh = mesh
        }
        if (node.type === "spotlight") {
          const [light, helper] = Elements.createSpotlight(node, this)
          node.light = light
          node.helper = helper
        }
        if (node.type === "world") {
          Elements.World.create(node, this)
        }
      }, {
        getChildren: node => node.children,
      })

      // Do group hierarchy second
      // Meshes must be first created before added to groups in order to achieve proper physics
      crawl(global.world.contents, (node: any, context) => {
        if (node.type === "group") {
          Elements.Group.create(node, this)
        }
        if (node.type === "world") {
          node.children.forEach((child) => {
            // this.scene.add(child.mesh || child.group)
            if (child.mesh) this.scene.add(child.mesh)
            if (child.group) this.scene.add(child.group)
            if (child.light) {
              this.scene.add(child.light)
              this.scene.add(child.light.target)
            }
            if (child.helper) {
              this.scene.add(child.helper)
              this.scene.add(child.helper.target)
            }

            if (child.group && child.physics) {
              this.physics.add.existing(child.mesh || child.group, {mass: child.physics.mass})
            }
          })
        }
      }, {
        getChildren: node => node.children,
        order: "post",
      })

      console.log(global.world.contents)
    }

    update() {
      this.controls.update()
      this.player.update()

      // this.raycaster.setFromCamera( this.pointer, this.camera );
      // const intersects = this.raycaster.intersectObjects( this.scene.children, false );
    }
  }


  PhysicsLoader('/assets/ammo', () => {
    new Project({ scenes: [MainScene], antialias: true })

    // @ts-ignore
    window.metabrowser = global

    // insert global scripts
    global.scripts.forEach((script) => {
      var domScript = document.createElement('script');
      domScript.innerHTML = script["#text"]
      document.body.appendChild(domScript);
    })

  })
}