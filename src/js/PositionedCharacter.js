import Character from './Character';

export default class PositionedCharacter {
  constructor(character, position) {
    if (!(character instanceof Character)) {
      throw new Error('character must be instance of Character or its children');
    }

    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }

    this.character = character;
    this.position = position;
  }
  
  determiningRadiusAttack(index, boardSize) {
    return this.determiningRadius(index, boardSize, this.character.radiusAttack);
  }

  determiningRadiusMotion(index, boardSize) {
    return this.determiningRadius(index, boardSize, this.character.radiusMotion);
  }

  determiningRadius(index, boardSize, number) {
    const position = this.position;
    const myСolumn = position % boardSize;
    const myString = Math.floor(position / boardSize);
    const requiredСolumn = index % boardSize;
    const requiredString = Math.floor(index / boardSize);
    const differenceString = Math.abs(myString - requiredString);
    const differenceСolumn = Math.abs(myСolumn - requiredСolumn);

    if (myString === requiredString && differenceСolumn <= number) {
      return true;
    }

    if (myСolumn === requiredСolumn && differenceString <= number) {
      return true;
    }

    if (differenceString <= number && differenceСolumn <= number && differenceString === differenceСolumn) {
      return true;
    }
  }
}
