import {THREE} from "enable3d";
import {IPainting} from "world/elements/painting";

export function create(painting: IPainting, project: any) {
  const texture = new THREE.TextureLoader().load( painting.src );
  const geometry = new THREE.PlaneGeometry( painting.size.width, painting.size.height, 1, 1 );
  const material = new THREE.MeshLambertMaterial( { map: texture } );
  const mesh = new THREE.Mesh(geometry, material);

  mesh.receiveShadow = true;
  mesh.material.side = THREE.DoubleSide;

  mesh.rotation.x = painting.rotation.x
  mesh.rotation.y = painting.rotation.y
  mesh.rotation.z = painting.rotation.z

  mesh.position.x = painting.position.x
  mesh.position.y = painting.position.y
  mesh.position.z = painting.position.z

  if (painting.physics) {
    // @ts-ignore
    project.physics.add.existing(mesh)
  }

  // project.scene.add( mesh );
  return mesh
}