import {THREE} from "enable3d";

export interface IBackground {
  create: () => void
}

export class Background implements IBackground {
  public scene: any;
  public global: any;
  private self: this;
  private project: any;

  constructor(project: any, global: any) {
    this.self = this
    this.project = project
    this.global = global
  }

  create(): void {
    if (this.global.world.background) this.project.scene.background = new THREE.Color(this.global.world.background);

    const src = this.global.world.skybox

    // build urls for each side of the skybox.
    const skyboxImagepaths = [
      src, src, src, src, src, src
    ]

    const materialArray = skyboxImagepaths.map(image => {
      let texture = new THREE.TextureLoader().load(image);
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });

    const skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
    const mesh = new THREE.Mesh(skyboxGeo, materialArray);

    this.project.scene.add( mesh );

    // this.project.scene.add(_skybox)
  }

}