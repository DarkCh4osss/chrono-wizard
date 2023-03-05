import { GameData } from "../GameData";

export default class Preloader extends Phaser.Scene {
  private _loading: Phaser.GameObjects.BitmapText;
  private _progress: Phaser.GameObjects.Graphics;
  private _image: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "Preloader",
    });
  }

  preload() {
    this.cameras.main.setBackgroundColor("#7b7971");
    this._progress = this.add.graphics();
    this.loadAssets();
  }

  update(time: number, delta: number) {}

  init() {
    localStorage.clear();
    this._image = this.add
      .image(
        GameData.preloader.imageX,
        GameData.preloader.imageY,
        GameData.preloader.image
      )
      .setAlpha(0);

    this.tweens.add({
      targets: [this._image],
      alpha: 1,
      duration: 500,
    });

    this._loading = this.add
      .bitmapText(this.game.canvas.width / 2, 580, "arcade", "", 30)
      .setAlpha(1)
      .setDepth(1001)
      .setOrigin(0.5, 1);
  }

  loadAssets(): void {
    this.load.on("start", () => {});

    this.load.on("fileprogress", (file: any, value: any) => {});

    this.load.on("progress", (value: any) => {
      this._progress.clear();
      this._progress.fillStyle(0xff0000, 1);
      this._progress.fillRect(0, 530, GameData.globals.width * value, 70);
      this._loading.setText("Lanciando un incantesimo...");
    });

    this.load.on("complete", () => {
      console.log("complete");
      this._loading.setText("Tap to start!");
      this.input.once("pointerdown", () => {
        this.tweens.add({
          targets: [this._image, this._loading],
          alpha: 0,
          duration: 500,
          onComplete: () => {
            this.scene.start("Intro");
            // this.scene.start("FirstLevel");
            // this.scene.start("Hud");
            // this.scene.bringToTop("Hud");
          },
        });
      });
    });

    //Assets Load
    //--------------------------

    //SCRIPT
    if (GameData.script != null)
      GameData.script.forEach((element: ScriptAsset) => {
        this.load.script(element.key, element.path);
      });

    // IMAGES
    if (GameData.images != null)
      GameData.images.forEach((element: ImageAsset) => {
        this.load.image(element.name, element.path);
      });

    // TILEMAPS
    if (GameData.tilemaps != null)
      GameData.tilemaps.forEach((element: TileMapsAsset) => {
        this.load.tilemapTiledJSON(element.key, element.path);
      });

    // ATLAS
    if (GameData.atlas != null)
      GameData.atlas.forEach((element: AtlasAsset) => {
        this.load.atlas(element.key, element.imagepath, element.jsonpath);
      });

    // SPRITESHEETS
    if (GameData.spritesheets != null)
      GameData.spritesheets.forEach((element: SpritesheetsAsset) => {
        this.load.spritesheet(element.name, element.path, {
          frameWidth: element.width,
          frameHeight: element.height,
          endFrame: element.frames,
        });
      });

    //bitmap fonts
    if (GameData.bitmapfont != null)
      GameData.bitmapfont.forEach((element: BitmapfontAsset) => {
        this.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
      });

    // SOUNDS
    if (GameData.sounds != null)
      GameData.sounds.forEach((element: SoundAsset) => {
        this.load.audio(element.name, element.paths);
      });

    // Audio
    if (GameData.audio != null)
      GameData.audio.forEach((element: AudioSpriteAsset) => {
        this.load.audioSprite(
          element.name,
          element.jsonpath,
          element.paths,
          element.instance
        );
      });
  }
}
