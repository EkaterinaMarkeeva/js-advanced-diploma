import Character from '../Character';
// eslint-disable-next-line
export default class Swordsman extends Character {
  constructor(level, type = 'swordsman') {
    super(level, type);
    if (level > 1) {
      this.attack = 40 * level;
      this.defence = 10 * level;
    } else {
      this.attack = 40;
      this.defence = 10;
    }
    
    this.radiusAttack = 1;
    this.radiusMotion = 4;
  }
}
