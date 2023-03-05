export default class Storia extends Phaser.Scene {
  private _logo: Phaser.GameObjects.Image;

  private _goBackText: Phaser.GameObjects.Text;
  private _storyText: Phaser.GameObjects.Text;
  private _creditsText: Phaser.GameObjects.Text;
  private _settingText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "Storia",
    });
  }

  preload() {
    // this.load.image("bg", "src/assets/images/bg.jpgassets/images/bg.png")
    this.load.image("book-menu", "assets/images/bookmenu.png");
  }
  create() {
    this.cameras.main.setBackgroundColor("#ffffff");
    console.log("create:storia");

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

    this.add.text(
      250,
      100,
      "C'era una volta un mago alchimista di\n nome Alderan, che aveva perso il suo\n caro amico a causa di una malattia\n sconosciuta. Disperato, decise di usare\n le sue conoscenze di alchimia per creare\n una pozione che potesse salvare altre\n persone dalla stessa malattia.\n\nChrono Wizard",
      {
        fontSize: "36px",
        color: "#272f40",
        fontFamily: "EnchantedLand",
      }
    );
    this.add.text(
      650,
      100,
      "Dopo mesi di ricerca e sperimentazione,\n Alderan scoprì che il segreto per la\n pozione risiedeva in un particolare\n tipo di fiore, il cui nome gli era sconosciuto.\n Deciso a trovare il fiore a ogni costo,\n pensò di utilizzare la sua conoscenza del\n viaggio nel tempo per facilitarsi nella\n ricera del fiore.",
      {
        fontSize: "36px",
        color: "#272f40",
        fontFamily: "EnchantedLand",
      }
    );

    this._goBackText = this.add.text(670, 500, "> Menù", {
      fontSize: "64px",
      color: "#272f40",
      fontFamily: "EnchantedLand",
    });

    this._goBackText.setInteractive().on("pointerdown", () => {
      this.play();
    });
  }

  play() {
    this.scene.start("Intro");
  }

  update(time: number, delta: number): void {
    // this._logo.rotation += .01;
  }
}
