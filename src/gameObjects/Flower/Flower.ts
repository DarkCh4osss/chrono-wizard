import GamePlay from "../../scenes/GamePlay";
import IFlower from "./IFlower";

export default class Flower
  extends Phaser.GameObjects.Sprite
  implements IFlower
{
  private _config: genericConfig;
  private _scene: GamePlay;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    this._scene = <GamePlay>this._config.scene;
    this._scene.physics.world.enable(this);
    this.setDepth(11);
    this._scene.add.existing(this);

    // this.anims.create({
    //   key: "flower-anim",
    //   frames: this.anims.generateFrameNumbers("blue-fl", { start: 0, end: 56 }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
    // this.setScale(0.5);
    // this.play("flower-anim");
  }

  update(time: number, delta: number): void {}
}
