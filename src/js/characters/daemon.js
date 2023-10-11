import Character from '../Character';
// eslint-disable-next-line
export default class Daemon extends Character {
  constructor(level, type = 'daemon') {
    super(level, type);
    if (level > 1) {
      this.attack = 10 * level;
      this.defence = 10 * level;
    } else {
      this.attack = 10;
      this.defence = 10;
    }
    
    this.radiusAttack = 4;
    this.radiusMotion = 1;
  }
}
