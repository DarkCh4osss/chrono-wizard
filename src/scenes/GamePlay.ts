import Flower from "../gameObjects/Flower/Flower";

export default class GamePlay extends Phaser.Scene {
  private _groupFlowers: Phaser.GameObjects.Group;

  constructor() {
    super({ key: "GamePlay" });
  }

  create() {
    console.log("create:gameplay");
    this._groupFlowers = this.add.group({ runChildUpdate: true });
  }
}
