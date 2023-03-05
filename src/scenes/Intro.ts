export default class Intro extends Phaser.Scene {
  private _logo: Phaser.GameObjects.Image;

  private _playText: Phaser.GameObjects.Text;
  private _storyText: Phaser.GameObjects.Text;
  private _creditsText: Phaser.GameObjects.Text;
  private _settingText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "Intro",
    });
  }

  preload() {
    // this.load.image("bg", "src/assets/images/bg.jpgassets/images/bg.png")
    this.load.image("book-menu", "assets/images/bookmenu.png");
  }
  create() {
    this.cameras.main.setBackgroundColor("#ffffff");
    console.log("create:intro");

    this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "bg"
    );
    this.add
      .image(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "book-menu"
      )
      .setScale(0.5);

    this.add.image(450, 350, "logo");
    // this._logo = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "logo-phaser")
    this.add.text(680, 100, "Chrono Wizard", {
      fontSize: "80px",
      color: "#272f40",
      fontFamily: "EnchantedLand",
    });

    this._playText = this.add.text(670, 180, "> Gioca", {
      fontSize: "64px",
      color: "#272f40",
      fontFamily: "EnchantedLand",
    });
    this._storyText = this.add.text(670, 255, "> Storia", {
      fontSize: "64px",
      color: "#272f40",
      fontFamily: "EnchantedLand",
    });
    this._creditsText = this.add.text(670, 330, "> Crediti", {
      fontSize: "64px",
      color: "#272f40",
      fontFamily: "EnchantedLand",
    });
    this._settingText = this.add.text(670, 405, "> Impostazioni", {
      fontSize: "64px",
      color: "#272f40",
      fontFamily: "EnchantedLand",
    });

    this._playText.setInteractive().on("pointerdown", () => {
      this.play();
    });
    this._storyText.setInteractive().on("pointerdown", () => {
      this.story();
    });
  }

  play() {
    this.scene.start("FirstLevel");
    this.scene.start("Hud");
    this.scene.bringToTop("Hud");
  }

  story() {
    this.scene.start("Storia");
  }

  update(time: number, delta: number): void {
    // this._logo.rotation += .01;
  }
}
