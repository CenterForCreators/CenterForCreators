import {THREE} from "enable3d";
import {IImage} from "elements/embedded/image";

export function create(image: IImage, project: any) {
  const texture = new THREE.TextureLoader().load( image.src );
  const geometry = new THREE.PlaneGeometry( image.size.width, image.size.height, 1, 1 );
  const material = new THREE.MeshLambertMaterial( { map: texture } );
  const mesh = new THREE.Mesh(geometry, material);

  mesh.receiveShadow = true;
  mesh.castShadow = true;
  mesh.material.side = THREE.DoubleSide;

  mesh.rotation.x = image.rotation.x
  mesh.rotation.y = image.rotation.y
  mesh.rotation.z = image.rotation.z

  mesh.position.x = image.position.x
  mesh.position.y = image.position.y
  mesh.position.z = image.position.z

  mesh.castShadow = image.shadow.cast
  mesh.receiveShadow = image.shadow.receive

  if (image.physics) {
    // @ts-ignore
    project.physics.add.existing(mesh, {mass: image.physics.mass})
  }

  // project.scene.add( mesh );
  return mesh
}