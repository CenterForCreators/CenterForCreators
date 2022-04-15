import {THREE} from "enable3d";

export function create(node: any, project: any) {
  const group = new THREE.Group();

  group.rotation.x = node.props.rotation.x
  group.rotation.y = node.props.rotation.y
  group.rotation.z = node.props.rotation.z

  group.position.x = node.props.position.x
  group.position.y = node.props.position.y
  group.position.z = node.props.position.z

  group.scale.x = node.props.scale.x
  group.scale.y = node.props.scale.y
  group.scale.z = node.props.scale.z

  node.group = group

  if (node.children) {
    node.children.forEach((child) => {
      node.group.add(child.mesh || child.group || child.light)

      if (child.mesh) node.group.add(child.mesh)
      if (child.group) node.group.add(child.group)
      if (child.light) {
        node.group.add(child.light)
        node.group.add( child.light.target )
      }
      if (child.helper) {
        node.group.add(child.helper)
        node.group.add(child.helper.target)
      }


      if (child.group && child.props.physics) {
        project.physics.add.existing(
          child.mesh || child.group, {mass: child.props.physics.mass})
      }
    })
  }
}