export default class Intro extends Phaser.Scene {
  private _logo: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Intro",
    });
  }

  preload() {
    // this.load.image("bg", "src/assets/images/bg.jpgassets/images/bg.png")
  }
  create() {
    this.cameras.main.setBackgroundColor("#ffffff");
    console.log("create:intro");

    this.add.text(0, 0, "Test", { fontSize: "24px", color: "#000000" });
    this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "bg"
    );
    // this._logo = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "logo-phaser")
  }

  update(time: number, delta: number): void {
    // this._logo.rotation += .01;
  }
}
