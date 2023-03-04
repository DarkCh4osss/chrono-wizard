// import GamePlay from "../../scenes/GamePlay";
// import Flower from "./Flower_Old";

// export default class BlueFlower extends Flower {
//   constructor(params: genericConfig) {
//     super(params);
//     this.setName("blue-flower");
//     this.create();
//   }

//   create(): void {
//     this._scene.physics.world.enable(this);
//     this.anims.create({
//       key: "flower-anim",
//       frames: this.anims.generateFrameNumbers("blue-fl", { start: 0, end: 60 }),
//       frameRate: 10,
//       repeat: -1,
//     });
//     this.setScale(0.5);
//     this.play("flower-anim");
//   }

//   getFlower(): void {
//     super.getFlower();
//   }

//   update(time: number, delta: number): void {}
// }
