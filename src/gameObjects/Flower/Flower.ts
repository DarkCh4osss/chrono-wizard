import GamePlay from "../../scenes/GamePlay";
import IFlower from "./IFlower";

export default class Flower
  extends Phaser.GameObjects.Sprite
  implements IFlower
{
  private _config: genericConfig;
  private _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    this._scene = <GamePlay>this._config.scene;
    this._scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._body.setCollideWorldBounds(true);
    this.setDepth(11);
    this._scene.add.existing(this);

    this.anims.create({
      key: "flower-anim",
      frames: this.anims.generateFrameNumbers("blue-fl", { start: 0, end: 56 }),
      frameRate: 10,
      repeat: -1,
    });
    this.setScale(0.5);
    this.play("flower-anim");
  }

  update(time: number, delta: number): void {}

  getBody(): Phaser.Physics.Arcade.Body {
    return this._body;
  }

  getFlower() {
    this._scene.removeFlower(this);
  }
}
