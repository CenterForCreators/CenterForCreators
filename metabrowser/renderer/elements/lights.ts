import {THREE} from "enable3d";
import {ISpotlight} from "elements/lights/spotlight";

export function createSpotlight(spotlight: ISpotlight, project: any) {
  let helper

  const light = new THREE.SpotLight( spotlight.color, spotlight.intensity);
  light.position.set( spotlight.position.x, spotlight.position.y, spotlight.position.z );
  light.castShadow = spotlight.shadow.cast

  if (spotlight.debug) {
    helper = new THREE.SpotLightHelper( light, spotlight.debug);
  }

  return [light, helper]
}