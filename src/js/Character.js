/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, type = 'generic') {
    if (new.target.name === 'Character') {
      throw new Error ("Невозможно создать персонажа");
    }

    if (level > 4 || level < 1) {
      throw new Error ("Уровень должно быть не менее 1 и не более 4");
    } else {
      this.level = level;
    }
    
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
    this.radiusAttack = 0;
    this.radiusMotion = 0;
    // TODO: выбросите исключение, если кто-то использует "new Character()"
  }
  
  getDamage(target) {
    return Math.max(this.attack - target.defence, this.attack * 0.1);
  }
}
