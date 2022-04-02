import {IWorldProps} from "world/wom";
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
}