import {IRectangle} from "elements/shapes/rectangle";
import {THREE} from "enable3d";

export function create(rectangle: IRectangle, project: any): any {
  const geometry = new THREE.BoxGeometry( rectangle.size.width, rectangle.size.height, rectangle.size.depth );
  const material = new THREE.MeshPhongMaterial({color: rectangle.color});
  const mesh = new THREE.Mesh( geometry, material );

  mesh.rotation.x = rectangle.rotation.x
  mesh.rotation.y = rectangle.rotation.y
  mesh.rotation.z = rectangle.rotation.z

  mesh.position.x = rectangle.position.x
  mesh.position.y = rectangle.position.y
  mesh.position.z = rectangle.position.z

  mesh.castShadow = rectangle.shadow.cast
  mesh.receiveShadow = rectangle.shadow.receive

  if (rectangle.physics) {
    project.physics.add.existing(mesh, {mass: rectangle.physics.mass})
  }

  return mesh
}