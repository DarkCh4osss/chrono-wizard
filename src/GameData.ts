export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 800,
    gameHeight: 600,
    bgColor: "#ffffff",
    debug: false,
  },

  preloader: {
    bgColor: "",
    image: "phaser",
    imageX: 512,
    imageY: 300,
    loadingText: "",
  },

  spritesheets: [],
  images: [
    {
      name: "logo-phaser",
      path: "assets/images/logo-phaser.png",
    },
    {
      name: "bg",
      path: "assets/images/bg.jpg",
    },
  ],
  atlas: [],
  sounds: [],
  audio: [],
  bitmapfont: [],
};
