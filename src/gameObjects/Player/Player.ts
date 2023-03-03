import GamePlay from "../../scenes/GamePlay";
import IPlayer from "./IPlayer";

export default class Player
  extends Phaser.GameObjects.Sprite
  implements IPlayer
{
  private _config: genericConfig;
  private _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _velocity: number = 160;

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
    this._cursors = this._scene.input.keyboard.createCursorKeys();
    this.setDepth(11);
    this._scene.add.existing(this);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update(time: number, delta: number): void {
    this.setDepth(this.y);
    if (this._cursors.left.isDown) {
      this._body.setVelocityX(-160);
      this.anims.play("left", true);
    } else if (this._cursors.right.isDown) {
      this._body.setVelocityX(160);
      this.anims.play("right", true);
    } else {
      this._body.setVelocityX(0);
      this.anims.play("turn");
    }

    if (this._cursors.up.isDown && this._body.touching.down) {
      this._body.setVelocityY(-330);
    }
  }
}
