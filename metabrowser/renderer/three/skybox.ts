import * as THREE from 'three';
import {Skybox} from "../../world/skybox";

export default function (scene, skybox: Skybox) {
  const {src} = skybox

  // build urls for each side of the skybox.
  const skyboxImagepaths = [
    src, src, src, src, src, src
  ]

  const materialArray = skyboxImagepaths.map(image => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });

  const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  const _skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(_skybox);
}
