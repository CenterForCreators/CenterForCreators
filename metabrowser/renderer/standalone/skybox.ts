export interface ISkybox {
  create: () => void
  update: () => void
  preload: () => void
}

export class Skybox implements ISkybox{
  private scene: any;

  constructor(scene: any) {
    this.scene = scene
  }
  create: () => {

  }

  preload(): void {
  }

  update(): void {
  }
}