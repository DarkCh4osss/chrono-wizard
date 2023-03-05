import Player from "../gameObjects/Player/Player";
import Flower from "../gameObjects/Flower/Flower";
// import BlueFlower from "../gameObjects/Flower/BlueFlower";

import eventsCenter from "../assets/utils/EventsCenter";

export default class FirstLevelPast extends Phaser.Scene {
  private _platforms: Phaser.Physics.Arcade.StaticGroup;
  private _stopCamera: Phaser.Physics.Arcade.StaticGroup;

  private _player: Player;
  private _firstFlower: Flower;
  private _secondFlower: Flower;
  private _thirdFlower: Flower;
  private _fourthFlower: Flower;

  private _flowerObtained1: boolean;
  private _flowerObtained2: boolean;
  private _flowerObtained3: boolean;
  private _flowerObtained4: boolean;

  private _flowerDestroyed1: string;
  private _flowerDestroyed2: string;
  private _flowerDestroyed3: string;
  private _flowerDestroyed4: string;

  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _newPlayerPosX: number;

  private _score: number = 0;

  constructor() {
    super({ key: "FirstLevelPast" });
  }

  preload() {
    this.load.image("collider", "assets/images/platform.png");
    this.load.image(
      "vertical_collider",
      "assets/images/vertical-obstacle-transparent.png"
    );
    this.load.image(
      "primo_livello_passato",
      "assets/images/primo_livello_passato.png"
    );
    this.load.spritesheet("wizard", "assets/playerAssets/WizardIdle.png", {
      frameWidth: 88,
      frameHeight: 100,
    });
    this.load.spritesheet("blue-fl", "assets/flowerAssets/blue-flower.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    eventsCenter.on(
      "player-posX",
      (playerPosX: number) => {
        this._newPlayerPosX = playerPosX;
        console.log(this._newPlayerPosX);
      },
      this
    );
  }

  create() {
    this.cameras.main.setBackgroundColor("#8b7971");
    console.log("create:FirstLevel");

    eventsCenter.on("flower-obtained", this.setObtainedFlower, this);
    this._flowerDestroyed1 = localStorage.getItem("flower-destroyed1");
    this._flowerDestroyed2 = localStorage.getItem("flower-destroyed2");
    this._flowerDestroyed3 = localStorage.getItem("flower-destroyed3");
    this._flowerDestroyed4 = localStorage.getItem("flower-destroyed4");

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

    this.time.addEvent({
      delay: 10 * 1000,
      callback: () => {
        this.scene.start("FirstLevel");
      },
      callbackScope: this,
    });

    this._platforms = this.physics.add.staticGroup();
    this._platforms.create(400, 685, "collider").setScale(2).refreshBody();
    this._platforms.create(800, 620, "collider");
    this._platforms.create(1030, 570, "collider");
    this._platforms.create(1220, 470, "collider");

    this._stopCamera = this.physics.add.staticGroup();
    this._stopCamera.create(1100, 350, "vertical_collider").setScale(0.5, 5);

    this._player = new Player({
      scene: this,
      x: 400,
      y: 590,
      key: "wizard",
    });

    this._firstFlower = new Flower({
      scene: this,
      x: 125,
      y: 595,
      key: "blue-fl",
    });
    this._firstFlower.setFlipX(true);
    this._firstFlower.setName("primo");

    this._secondFlower = new Flower({
      scene: this,
      x: 650,
      y: 580,
      key: "blue-fl",
    });
    this._secondFlower.setFlipX(true);
    this._secondFlower.setName("secondo");

    this._thirdFlower = new Flower({
      scene: this,
      x: 900,
      y: 430,
      key: "blue-fl",
    });
    this._thirdFlower.setFlipX(true);
    this._thirdFlower.setName("terzo");

    this._fourthFlower = new Flower({
      scene: this,
      x: 1050,
      y: 345,
      key: "blue-fl",
    });
    this._fourthFlower.setFlipX(true);
    this._fourthFlower.setName("quarto");

    this.physics.add.collider(this._player, this._platforms);
    this.physics.add.collider(this._player, this._stopCamera, () => {
      this.stopFollowPlayer();
    });
    this.physics.add.collider(this._firstFlower, this._platforms);
    this.physics.add.collider(this._secondFlower, this._platforms);
    this.physics.add.collider(this._thirdFlower, this._platforms);
    this.physics.add.collider(this._fourthFlower, this._platforms);

    this.physics.add.collider(this._player, this._firstFlower, () => {
      this._flowerObtained1 = true;
      eventsCenter.emit("flower-picked", 1);
      this.removeFlower(this._firstFlower);
      this.updateScore();
    });

    this.physics.add.collider(this._player, this._secondFlower, () => {
      this._flowerObtained2 = true;
      eventsCenter.emit("flower-picked", 2);
      this.removeFlower(this._secondFlower);
      this.updateScore();
    });

    this.physics.add.collider(this._player, this._thirdFlower, () => {
      this._flowerObtained3 = true;
      eventsCenter.emit("flower-picked", 3);
      this.removeFlower(this._thirdFlower);
      this.updateScore();
    });

    this.physics.add.collider(this._player, this._fourthFlower, () => {
      this._flowerObtained4 = true;
      eventsCenter.emit("flower-picked", 4);
      this.removeFlower(this._fourthFlower);
      this.updateScore();
    });

    this.followPlayer();

    // this._text = this.add
    //   .text(400, 300, "Palle")
    //   .setScrollFactor(0)
    //   .setFontSize(30)
    //   .setShadow(2, 2, "#000000", 2)
    //   .setStroke("#ff0000", 5);

    if (this._flowerObtained1 || this._flowerDestroyed1 === "true")
      this.removeFlower(this._firstFlower);
    if (this._flowerObtained2 || this._flowerDestroyed2 === "true")
      this.removeFlower(this._secondFlower);
    if (this._flowerObtained3 || this._flowerDestroyed3 === "true")
      this.removeFlower(this._thirdFlower);
    if (this._flowerObtained4 || this._flowerDestroyed4 === "true")
      this.removeFlower(this._fourthFlower);
  }

  updateScore() {
    console.log(this._score);
    this._score++;
    this.registry.set("score", this._score);
    console.log(this._score);
    eventsCenter.emit("score-updated");
  }

  followPlayer() {
    this._mainCamera.startFollow(this._player, true, 0.1, 0.1);
  }
  stopFollowPlayer() {
    this._mainCamera.stopFollow();
  }

  // hitFlower(player: any, flower: any) {
  //   const _firstFlower: Flower = <Flower>flower;
  //   _firstFlower.getFlower();
  // }

  setObtainedFlower(numFlowerPicked: number) {
    switch (numFlowerPicked) {
      case 1:
        this.removeFlower(this._firstFlower);
      case 2:
        this.removeFlower(this._secondFlower);
      case 3:
        this.removeFlower(this._thirdFlower);
      case 4:
        this.removeFlower(this._fourthFlower);
    }
  }

  removeFlower(_flowerToDestroy: Flower) {
    _flowerToDestroy.destroy();
    console.log(_flowerToDestroy.name);
    // localStorage.setItem("flower-destroyed", "true");
    // localStorage.setItem("flower-obtained", "1");
    switch (_flowerToDestroy.name) {
      case "primo":
        localStorage.setItem("flower-destroyed1", "true");
      case "secondo":
        localStorage.setItem("flower-destroyed2", "true");
      case "terzo":
        localStorage.setItem("flower-destroyed3", "true");
      case "quarto":
        localStorage.setItem("flower-destroyed4", "true");
    }
  }

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

  update(time: number, delta: number) {
    this._player.update(time, delta);
  }
}
