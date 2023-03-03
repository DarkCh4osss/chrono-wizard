interface IPlayer {
  create(): void;
  update(time: number, delta: number): void;
}

export default IPlayer;
