export default class GameState {
  constructor() {
    this.motion = 0;
    this.lvlGame = 0;
    this.victory = 0;
    this.defeat = 0;
    this.positionedCharacters = [];
    this.pointerActiveLocked = false;
}

  static from(object) {
    if (object) {
      return {
        motion: object.motion,
        lvlGame: object.lvlGame,
        positionedCharacters: object.positionedCharacters,
        pointerActiveLocked: object.pointerActiveLocked,
        victory: object.victory,
        defeat: object.defeat
      }
    }
    // TODO: create object
    return null;
  }
}
