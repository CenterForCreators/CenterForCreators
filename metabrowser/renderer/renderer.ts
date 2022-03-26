// Sample floating cube.
import * as THREE from 'three';
import {Rectangle} from "../WOM/Element";
import { FirstPersonControls } from '../controls/FirstPersonControls.js';

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
camera.position.z = 1;
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();
let controls = new FirstPersonControls( camera, renderer.domElement );

controls.movementSpeed = 1;
controls.lookSpeed = 0.125;
controls.lookVertical = true;

// animation
function animation( time ) {
  // mesh.rotation.x = time / 2000;
  // mesh.rotation.y = time / 1000;
  renderer.render( scene, camera );
  controls.update( clock.getDelta() );
}

export function render(WOM: Array<Rectangle>) {
  for (let i = 0; i < WOM.length; i++) {
    let rectangle = WOM[i]

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