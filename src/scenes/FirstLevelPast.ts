import Player from "../gameObjects/Player/Player";
import Flower from "../gameObjects/Flower/Flower";
// import BlueFlower from "../gameObjects/Flower/BlueFlower";

export default class FirstLevelPast extends Phaser.Scene {
  private _platforms: Phaser.Physics.Arcade.StaticGroup;
  private _player: Player;
  private _flower: Flower;

  private _flowerObtained: boolean;

  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _text: Phaser.GameObjects.Text;

  private _initialTime: number;

  constructor() {
    super({ key: "FirstLevelPast" });
  }

  init(_gotFlower: boolean) {
    this._flowerObtained = _gotFlower;
  }

  preload() {
    this.load.image("collider", "assets/images/platform_test.png");
    this.load.image("vertical_collider", "assets/images/vertical-obstacle.png");
    this.load.image(
      "primo_livello_passato",
      "assets/images/primo_livello_passato.png"
    );
    this.load.spritesheet("wizard", "assets/playerAssets/WizardIdle.png", {
      frameWidth: 88,
      frameHeight: 100,
    });
    this.load.spritesheet("blue-fl", "assets/flowerAssets/blue-fl.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  create() {
    this.cameras.main.setBackgroundColor("#8b7971");
    console.log("create:FirstLevelPast");

    this._initialTime = 10;

    this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "bg"
    );
    this.add
      .image(this.game.canvas.width / 2, 500, "primo_livello_passato")
      .setScale(2);

    this._mainCamera = this.cameras.main;
    this._mainCamera.setBackgroundColor(0x000000);

    this._mainCamera.setBounds(
      0,
      0,
      this.game.canvas.width * 2,
      this.game.canvas.height * 2
    );

    this.time.addEvent({
      delay: 0,
      callback: this.zoomTo,
      callbackScope: this,
    });

    this._platforms = this.physics.add.staticGroup();
    this._platforms.create(400, 685, "collider").setScale(2).refreshBody();
    this._platforms.create(800, 620, "collider");
    this._platforms.create(1030, 570, "collider");
    this._platforms.create(1220, 470, "collider");
    this._platforms.create(1100, 350, "vertical_collider").setScale(0.5, 5);
    console.log(this._platforms.getChildren()[6]);

    this._player = new Player({
      scene: this,
      x: 400,
      y: 590,
      key: "wizard",
    });

    this._flower = new Flower({
      scene: this,
      x: 125,
      y: 595,
      key: "blue-fl",
    });
    this._flower.setFlipX(true);
    // this._player.setScale(32, 32);
    // this._player.setBounce(0.2);
    // this._player.setCollideWorldBounds(true);

    this.physics.add.collider(this._player, this._platforms);
    this.physics.add.collider(this._flower, this._platforms);
    this.physics.add.collider(this._player, this._flower, () => {
      this._flowerObtained = true;
    });

    this.followPlayer();

    // this._text = this.add
    //   .text(400, 300, "Palle")
    //   .setScrollFactor(0)
    //   .setFontSize(30)
    //   .setShadow(2, 2, "#000000", 2)
    //   .setStroke("#ff0000", 5);]

    console.log(this.formatTime(this._initialTime));
  }

  followPlayer() {
    this._mainCamera.startFollow(this._player, true, 0.1, 0.1);
  }
  stopFollowPlayer() {
    this._mainCamera.stopFollow();
  }

  hitFlower(player: any, flower: any) {
    const _flower: Flower = <Flower>flower;
    _flower.getFlower();
  }

  // removeFlower(flower: Flower) {
  //   flower.getFlower(this._flower);
  // }

  zoomTo() {
    this._mainCamera.zoomTo(
      2.5,
      100,
      "Sine.easeInOut",
      true, // force
      (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        if (progress === 1) {
          console.log("zoom completed");
        }
      },
      this
    );
  }

  formatTime(seconds: number) {
    // Minutes
    let minutes = Math.floor(seconds / 60);
    // Seconds
    let partInSeconds: String = (seconds % 60).toString();
    return `${partInSeconds}`;
  }

  onEvent() {
    this._initialTime -= 1; // One second
  }

  update(time: number, delta: number) {
    this._player.update(time, delta);

    if (this.formatTime(this._initialTime) === "0") {
      this.scene.start("FirstLevel");
    }
  }
}
