export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1280,
    gameHeight: 729,
    bgColor: "#8b7971",
    debug: false,
  },

  preloader: {
    bgColor: "#8b7971",
    image: "logo",
    imageX: 640,
    imageY: 340,
    loadingText: "",
  },

  spritesheets: [
    // {
    //   name: "Wizard",
    //   path: "assets/playerAssets/WizardIdle.png",
    //   width: 88,
    //   height: 110,
    //   frame: 19,
    // },
    // {
    //   name: "blue-fl",
    //   path: "assets/flowerAssets/blue-fl",
    //   width: 128,
    //   height: 128,
    //   frame: 60,
    // },
  ],
  images: [
    {
      name: "logo",
      path: "assets/images/logo.png",
    },
    {
      name: "bg",
      path: "assets/images/basic_bg.jpg",
    },
  ],
  atlas: [],
  sounds: [],
  audio: [],
  bitmapfont: [],
  tilemaps: [],
};
