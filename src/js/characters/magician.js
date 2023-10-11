import Character from '../Character';
// eslint-disable-next-line
export default class Magician extends Character {
  constructor(level, type = 'magician') {
    super(level, type);
    if (level > 1) {
      this.attack = 10 * level;
      this.defence = 40 * level;
    } else {
      this.attack = 10;
      this.defence = 40;
    }
    
    this.radiusAttack = 4;
    this.radiusMotion = 1;
  }
}
