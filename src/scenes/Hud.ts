import eventsCenter from "../assets/utils/EventsCenter";
import GamePlay from "./GamePlay";

export default class Hud extends Phaser.Scene {
  private _score: number;
  constructor() {
    super({
      key: "Hud",
    });
  }

  preload() {}

  create() {
    console.log("create:HUD");
    const _text = this.add.text(50, 50, "", {
      font: "24px Courier",
      fontStyle: "strong",
      color: "#000",
    });

    _text.setText([
      `Flowers: ${
        !localStorage.getItem("flower-obtained")
          ? "0"
          : localStorage.getItem("flower-obtained")
      }`,
    ]);
    eventsCenter.on(
      "score-updated",
      () => {
        this.time.addEvent({
          delay: 100,
          callback: () => this.updateText(_text),
          callbackScope: this,
        });
      },
      this
    );
  }

  updateText(newText: Phaser.GameObjects.Text) {
    newText.setText([`Flowers: ${this.registry.get("score")}`]);
  }

  update(time: number, delta: number): void {}
}
