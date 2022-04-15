import {IWorldProps} from "elements/world/world";
import {THREE} from "enable3d";

export function create(worldProps: IWorldProps, project: any) {
  if (worldProps.background) {
    project.scene.background = new THREE.Color(worldProps.background);
  }

  if (worldProps.grid) {
    const helper = new THREE.GridHelper( 1000, 100, 0xff0000, 0xdddddd );
    project.scene.add( helper );
  }

  if (worldProps.debug) {
    project.physics.debug.enable()
  }

  if (worldProps.skybox) {
    const src = worldProps.skybox

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

    project.scene.add( mesh );
  }

  if (!worldProps.dark) {
    project.warpSpeed("light")
  }
}