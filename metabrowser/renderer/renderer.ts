// Sample floating cube.
import * as THREE from 'three';
import { OrbitControls as Controls  } from '../controls/OrbitControls.js';
import {IGlobal} from "../WOM/wom";
import renderSkybox from './skybox'

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.01,
  10000,
);
camera.position.set(0, 0, -2);

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( tick );
document.body.appendChild( renderer.domElement );

let controls = new Controls( camera, renderer.domElement );

function tick( time ) {
  renderer.render( scene, camera );
  controls.update( );
}
export function render(global: IGlobal) {
  if (global.world.background) scene.background = new THREE.Color(global.world.background);

  if (global.world.skybox) renderSkybox(scene, global.world.skybox)
  
  for (let i = 0; i < global.world.rectangles.length; i++) {
    let rectangle = global.world.rectangles[i]

    const geometry = new THREE.BoxGeometry( rectangle.size.width, rectangle.size.height, rectangle.size.depth );
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh( geometry, material );

    mesh.rotation.x = rectangle.rotation.x
    mesh.rotation.y = rectangle.rotation.y
    mesh.rotation.z = rectangle.rotation.z

    mesh.position.x = rectangle.coordinates.x
    mesh.position.y = rectangle.coordinates.y
    mesh.position.z = rectangle.coordinates.z

    scene.add( mesh );
  }
}