import Character from '../Character';
// eslint-disable-next-line
export default class Vampire extends Character {
  constructor(level, type = 'vampire') {
    super(level, type);
    if (level > 1) {
      this.attack = 25 * level;
      this.defence = 25 * level
    } else {
      this.attack = 25;
      this.defence = 25;
    }
    
    this.radiusAttack = 2;
    this.radiusMotion = 2;
  }
}
