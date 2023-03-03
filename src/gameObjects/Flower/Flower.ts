import GamePlay from "../../scenes/GamePlay";
import IFlower from "./IFlower";

export default class Flower
  extends Phaser.GameObjects.Sprite
  implements IFlower
{
  protected _config: genericConfig;
  protected _scene: GamePlay;
  protected _body: Phaser.Physics.Arcade.Body;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    // this._scene.addFlower(this);
    this._scene.add.existing(this);
    this._body.setImmovable(true);
    this.setDepth(100);
  }

  create() {}
  update(time: number, delta: number) {}
  getBody(): Phaser.Physics.Arcade.Body {
    return this._body;
  }

  getFlower() {
    this._scene.removeFlower(this);
  }
}
