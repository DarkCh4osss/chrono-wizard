import "phaser";
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import Intro from "./scenes/Intro";
import Hud from "./scenes/Hud";
import GameOver from "./scenes/GameOver";
import FirstLevel from "./scenes/FirstLevel";
import GamePlay from "./scenes/GamePlay";
import { GameData } from "./GameData";
import FirstLevelPast from "./scenes/FirstLevelPast";

window.addEventListener("load", () => {
  const config: any = {
    type: Phaser.WEBGL,
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },

    scene: [
      Boot,
      Preloader,
      Intro,
      Hud,
      GamePlay,
      FirstLevel,
      FirstLevelPast,
      GameOver,
    ],

    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: GameData.globals.debug,
      },
    },
    input: {
      activePointers: 2,
      keyboard: true,
    },
    render: {
      pixelArt: true,
      antialias: false,
    },
  };

  const game = new Phaser.Game(config);
});
