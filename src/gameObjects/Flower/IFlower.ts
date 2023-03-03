interface IFlower {
  create(): void;
  update(time: number, delta: number): void;
}

export default IFlower;
