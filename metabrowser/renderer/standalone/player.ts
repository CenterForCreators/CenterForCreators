import {ExtendedObject3D, PointerDrag, PointerLock, ThirdPersonControls, THREE} from "enable3d";

export interface IPlayer {
  update: () => void
  preload: () => void
}

const isTouchDevice = 'ontouchstart' in window

export class Player implements IPlayer {
  private canJump: boolean;
  private move: boolean;
  private moveTop: number;
  private moveRight: number;
  private scene: any
  private self: this;
  private man: any;
  private animationMixers: any;
  private controls: any;
  private keys: { a: { isDown: boolean }; s: { isDown: boolean }; d: { isDown: boolean }; w: { isDown: boolean }; space: { isDown: boolean } };

  constructor(scene: any) {
    this.self = this
    this.scene = scene
    this.canJump = true
    this.move = false

    this.moveTop = 0
    this.moveRight = 0
  }

  async preload(): Promise<void> {
    const man = await this.scene.load.preload('man', '/assets/glb/box_man.glb')
  }

  async create(): Promise<void> {
    const object = await this.scene.load.gltf('man')
    const man = object.scene.children[0]

    this.man = new ExtendedObject3D()
    this.man.name = 'man'
    this.man.rotateY(Math.PI + 0.1) // a hack
    this.man.add(man)
    this.man.rotation.set(0, Math.PI * 1.5, 0)
    this.man.position.set(0, 5, 0)
    // add shadow
    this.man.traverse(child => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = false
        // https://discourse.threejs.org/t/cant-export-material-from-blender-gltf/12258
        child.material.roughness = 1
        child.material.metalness = 0
      }
    })

    /**
     * Animations
     */
    this.scene.animationMixers.add(this.man.animation.mixer)
    object.animations.forEach(animation => {
      if (animation.name) {
        this.man.animation.add(animation.name, animation)
      }
    })
    this.man.animation.play('idle')

    /**
     * Add the player to the scene with a body
     */
    this.scene.add.existing(this.man)
    this.scene.physics.add.existing(this.man, {
      shape: 'sphere',
      radius: 0.25,
      width: 0.5,
      offset: { y: -0.25 }
    })


    this.man.body.setFriction(0.8)
    this.man.body.setAngularFactor(0, 0, 0)

    // https://docs.panda3d.org/1.10/python/programming/physics/bullet/ccd
    this.man.body.setCcdMotionThreshold(1e-7)
    this.man.body.setCcdSweptSphereRadius(0.25)

    /**
     * Add 3rd Person Controls
     */
    this.controls = new ThirdPersonControls(this.scene.camera, this.man, {
      offset: new THREE.Vector3(0, 1, 0),
      targetRadius: 3
    })

    // set initial view to 90 deg theta
    this.controls.theta = 90

    /**
     * Add Pointer Lock and Pointer Drag
     */
    if (!isTouchDevice) {
      let pl = new PointerLock(this.scene.canvas)
      let pd = new PointerDrag(this.scene.canvas)
      pd.onMove(delta => {
        if (pl.isLocked()) {
          this.controls.update(delta.x * 2, delta.y * 2)
        }
      })
    }

    this.keys = {
      w: { isDown: false },
      a: { isDown: false },
      s: { isDown: false },
      d: { isDown: false },
      space: { isDown: false }
    }

    const press = (e, isDown) => {
      e.preventDefault()
      const { keyCode } = e
      switch (keyCode) {
        case 87: // w
          this.keys.w.isDown = isDown
          break
        case 83: // w
          this.keys.s.isDown = isDown
          break
        case 38: // arrow up
          this.keys.w.isDown = isDown
          break
        case 32: // space
          this.keys.space.isDown = isDown
          break
      }
    }

    document.addEventListener('keydown', e => press(e, true))
    document.addEventListener('keyup', e => press(e, false))
  }

  jump() {
    if (!this.man || !this.canJump) return
    this.canJump = false
    this.man.animation.play('jump_running', 500, false)
    setTimeout(() => {
      this.canJump = true
      this.man.animation.play('idle')
    }, 450)
    this.man.body.applyForceY(6)
  }

  update() {
    if (this.man && this.man.body) {
      /**
       * Update Controls
       */
      this.controls.update(this.moveRight * 2, -this.moveTop * 2)
      /**
       * Player Turn
       */
      const speed = 4
      const v3 = new THREE.Vector3()

      const rotation = this.scene.camera.getWorldDirection(v3)
      const theta = Math.atan2(rotation.x, rotation.z)
      const rotationMan = this.man.getWorldDirection(v3)
      const thetaMan = Math.atan2(rotationMan.x, rotationMan.z)
      this.man.body.setAngularVelocityY(0)

      const l = Math.abs(theta - thetaMan)
      let rotationSpeed = isTouchDevice ? 2 : 4
      let d = Math.PI / 24

      if (l > d) {
        if (l > Math.PI - d) rotationSpeed *= -1
        if (theta < thetaMan) rotationSpeed *= -1
        this.man.body.setAngularVelocityY(rotationSpeed)
      }

      /**
       * Player Move
       */
      if (this.keys.w.isDown || this.move) {
        if (this.man.animation.current === 'idle' && this.canJump) this.man.animation.play('run')

        const x = Math.sin(theta) * speed,
          y = this.man.body.velocity.y,
          z = Math.cos(theta) * speed

        this.man.body.setVelocity(x, y, z)
      } else {
        if (this.man.animation.current === 'run' && this.canJump) this.man.animation.play('idle')
      }

      if (this.keys.s.isDown) {
        const x = Math.sin(theta) * (speed * -1),
          y = this.man.body.velocity.y,
          z = Math.cos(theta) * (speed * -1)

        this.man.body.setVelocity(x, y, z)
      }

      /**
       * Player Jump
       */
      if (this.keys.space.isDown && this.canJump) {
        this.jump()
      }
    }
  }
}
