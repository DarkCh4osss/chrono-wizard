interface genericConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
}

interface ImageAsset {
  name: string;
  path: string;
}

interface ScriptAsset {
  key: string;
  path: string;
}

interface TileMapsAsset {
  key: string;
  path: string;
}

interface SpritesheetsAsset {
  name: string;
  path: string;
  width: number;
  height: number;
  frames: number;
  spacing?: number;
}

interface SoundAsset {
  name: string;
  paths: Array<string>;
}

interface AudioSpriteAsset {
  name: string;
  jsonpath: string;
  paths: Array<string>;
  instance: { instance: number };
}

interface BitmapfontAsset {
  name: string;
  imgpath: string;
  xmlpath: string;
}

interface AtlasAsset {
  key: string;
  imagepath: string;
  jsonpath: string;
}

