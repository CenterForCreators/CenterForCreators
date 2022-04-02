import {IGlobal} from "world/wom";
import { Project, Scene3D, PhysicsLoader, THREE } from 'enable3d'
import * as Elements from "renderer/elements/index";
import {OrbitControls} from "renderer/controls/OrbitControls";
import {IControls} from "renderer/controls/types";
import {Player} from "renderer/player";
import {Background} from "renderer/background";
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
      
      await this.warpSpeed.apply(this, ["light"])
      // this.physics.debug.enable()

      const box = this.physics.add.box({
        x: 0, y: -50.5, z: 0,
        width: 100,
        height: 100.5,
        depth: 100
      }, { lambert: { color: 'white' } })
      box.body.setCollisionFlags(2)

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
      this.camera.position.set(0, 1, 0)

      // Crawl and build meshes.
      crawl(global.world.contents, (node: any, context) => {
        if (node.type === "rectangle") {
          const mesh = Elements.Rectangle.create(node.props, this)
          node.mesh = mesh
        }
        if (node.type === "painting") {
          const mesh = Elements.Painting.create(node.props, this)
          node.mesh = mesh
        }
        if (node.type === "world") {
          Elements.World.create(node.props, this)
        }
      }, {
        getChildren: node => node.children,
      })

      // Do group hierarchy
      crawl(global.world.contents, (node: any, context) => {
        if (node.type === "group") {
          const group = new THREE.Group();

          group.rotation.x = node.props.rotation.x
          group.rotation.y = node.props.rotation.y
          group.rotation.z = node.props.rotation.z

          group.position.x = node.props.position.x
          group.position.y = node.props.position.y
          group.position.z = node.props.position.z

          node.group = group

          if (node.children) {
            node.children.forEach((child) => {
              node.group.add(child.mesh || child.group)
              if (child.group && child.props.physics) {
                this.physics.add.existing(child.mesh || child.group)
              }
            })
          }
        }

        if (node.type === "world") {
          node.children.forEach((child) => {
            this.scene.add(child.mesh || child.group)
            if (child.group && child.props.physics) {
              this.physics.add.existing(child.mesh || child.group)
            }
          })
        }

      }, {
        getChildren: node => node.children,
        order: "post",
      })
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