import Player from "../gameObjects/Player/Player";

export default class GameOver extends Phaser.Scene {
  private _player: Player;

  constructor() {
    super({
      key: "GameOver",
    });
  }

  create() {
    console.log("Create:gameover");
    this._player = new Player({
      scene: this,
      x: 100,
      y: 450,
      key: "dude",
    });
  }

  update(time: number, delta: number) {
    this._player.update(time, delta);
  }
}
