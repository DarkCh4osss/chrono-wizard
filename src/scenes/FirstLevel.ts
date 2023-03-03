import Player from "../gameObjects/Player/Player";
import Flower from "../gameObjects/Flower/Flower";

export default class FirstLevel extends Phaser.Scene {
  private _platforms: Phaser.Physics.Arcade.StaticGroup;
  private _player: Player;

  private _endLevel: Phaser.Physics.Arcade.Sprite;

  private _mainCamera: Phaser.Cameras.Scene2D.Camera;

  // private _groupFlowers: Phaser.GameObjects.Group;

  constructor() {
    super({ key: "FirstLevel" });
  }

  preload() {
    this.load.image("ground", "assets/images/platform.png");
    this.load.image("star", "assets/images/star.png");
    this.load.spritesheet("dude", "assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    console.log("create:FirstLevel");
    this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "bg"
    );

    this._mainCamera = this.cameras.main;
    this._mainCamera.setBackgroundColor(0x000000);

    this._mainCamera.setBounds(
      0,
      0,
      this.game.canvas.width * 2,
      this.game.canvas.height * 2
    );

    this._platforms = this.physics.add.staticGroup();
    this._platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this._platforms.create(600, 400, "ground");
    this._platforms.create(50, 250, "ground");
    this._platforms.create(750, 220, "ground");

    this._endLevel = this.physics.add.sprite(790, 220, "logo-phaser");
    this._endLevel.setCollideWorldBounds(true);

    this._player = new Player({
      scene: this,
      x: 100,
      y: 450,
      key: "dude",
    });
    // this._player.setBounce(0.2);
    // this._player.setCollideWorldBounds(true);

    this.physics.add.collider(this._player, this._platforms);

    this.physics.add.collider(this._player, this._endLevel, () => {
      this.scene.start("GameOver");
    });

    this.followPlayer();

    // this._groupFlowers = this.add.group({ runChildUpdate: true });

    // this.addFlower(new BlueFlower({ scene: this, x: 100, y: 100, key: "blue-fl" }));
    // this.physics.add.collider(this._player, this._groupFlowers, this.hitFlower, undefined, this);
  }

  followPlayer() {
    this._mainCamera.startFollow(this._player, true, 0.1, 0.1);
  }

  hitFlower(player: any, flower: any) {
    const _flower: Flower = <Flower>flower;
    _flower.getFlower();
  }

  // removeFlower(flower: Flower) {
  //   this._groupFlowers.remove(flower, true, true);
  // }

  update(time: number, delta: number) {
    this._player.update(time, delta);
  }
}
