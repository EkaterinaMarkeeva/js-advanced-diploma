import { getThemes } from './themes';
import { generateTeam, getRandomInt } from './generators';
import PositionedCharacter from './PositionedCharacter';
import characters from './characters/characters';
import GamePlay from './GamePlay';
import cursors from './cursors';
import GameState from './GameState';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.activeCharacter = null;
    this.state = new GameState();
  }

  init() {
    this.gamePlay.drawUi(getThemes()[0]);
    this.registrationEvents();
    
    const teamPlayer = generateTeam([characters.bowman, characters.swordsman, characters.magician], 1, 2);
    const teamOpponent = generateTeam([characters.daemon, characters.undead, characters.vampire], 1, 2);
    const usedPosition = [];

    this.creatChars(teamPlayer, teamOpponent, usedPosition);
    this.gamePlay.redrawPositions(this.state.positionedCharacters);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }
  
  creatChars(charPlayer, charOpponent, usedPosition) {
    charPlayer.characters.forEach(character => {
      const positionPlayer = createPosition(0, this.gamePlay.boardSize - 1, 0, 1, this.gamePlay.boardSize, usedPosition);
      const positionedCharacter = new PositionedCharacter(character, positionPlayer);

      positionedCharacter.isPlayer = true;
      positionedCharacter.condition = 'live';

      this.state.positionedCharacters.push(positionedCharacter);
      usedPosition.push(positionPlayer);
    });

    charOpponent.characters.forEach(character => {
      const positionOpponent = createPosition(0, this.gamePlay.boardSize - 1, this.gamePlay.boardSize - 2, this.gamePlay.boardSize - 1, this.gamePlay.boardSize, usedPosition);
      const positionedCharacter = new PositionedCharacter(character, positionOpponent);

      positionedCharacter.isPlayer = false;
      positionedCharacter.condition = 'live';

      this.state.positionedCharacters.push(positionedCharacter);
      usedPosition.push(positionOpponent);
    });

    function createPosition(minString, maxString, minColumn, maxColumn, boardSize, usedPosition) {
      let position;
      let index = 0;

      while ((!position || usedPosition.includes(position)) && index < 1000) {
        let string = getRandomInt(minString, maxString);
        let column = getRandomInt(minColumn, maxColumn)

        position = string * boardSize + column;
        index += 1;
      }

      return position;
    }
  }

  lvlUpGame(numberСharacters) {
    this.state.lvlGame += 1;
    this.activeCharacter = null;
    this.state.motion = 0;

    this.gamePlay.drawUi(getThemes()[this.state.lvlGame]);

    const newCharPlayer = generateTeam([characters.bowman, characters.swordsman, characters.magician], this.state.lvlGame + 1, numberСharacters - this.state.positionedCharacters.length);
    const newCharOpponent = generateTeam([characters.daemon, characters.undead, characters.vampire], this.state.lvlGame + 1, numberСharacters);
    const usedPosition = [];

    this.state.positionedCharacters.forEach(positionedCharacter => {
      if (positionedCharacter.condition === 'live') {
        const attackBefore = positionedCharacter.character.attack;
        const defenceBefore = positionedCharacter.character.defence;

        positionedCharacter.character.level += 1;
        positionedCharacter.character.attack = Math.ceil(Math.max(attackBefore, attackBefore * (80 + positionedCharacter.character.health) / 100));
        positionedCharacter.character.defence = Math.ceil(Math.max(defenceBefore, defenceBefore * (80 + positionedCharacter.character.health) / 100));
        
        if (positionedCharacter.character.health + 80 > 100) {
          positionedCharacter.character.health = 100
        } else {
          positionedCharacter.character.health += 80;
        }
      } else {
        positionedCharacter.character.health = 50;
      }
    });

    this.state.positionedCharacters.forEach(positionedCharacter => {
      newCharPlayer.characters.push(positionedCharacter.character);
    });

    this.state.positionedCharacters = [];

    this.creatChars(newCharPlayer, newCharOpponent, usedPosition);
    this.gamePlay.redrawPositions(this.state.positionedCharacters);
  }

  newGame() {
    this.activeCharacter = null;
    this.state = new GameState();

    this.init();
  }

  onSaveGameListener() {
    this.stateService.save(this.state);
  }

  onLoadGameListener() {
    const newState = GameState.from(this.stateService.load());

    for (let key in this.state) {
      this.state[key] = newState[key];
    }
    
    this.state.positionedCharacters = this.state.positionedCharacters.map(positionedCharacter => {
      const character = new characters[positionedCharacter.character.type](positionedCharacter.character.level);
      
      character.attack = positionedCharacter.character.attack;
      character.defence = positionedCharacter.character.defence;
      character.health = positionedCharacter.character.health;

      const newPositionedCharacter = new PositionedCharacter(character, positionedCharacter.position)

      newPositionedCharacter.isPlayer = positionedCharacter.isPlayer;
      newPositionedCharacter.condition = positionedCharacter.condition;

      return newPositionedCharacter;
    });
    
    this.activeCharacter = null;
    this.gamePlay.drawUi(getThemes()[this.state.lvlGame]);
    this.gamePlay.redrawPositions(this.state.positionedCharacters.filter(character => character.condition !== 'dead'));
  }

  registrationEvents() {
    this.removeEvents();
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addNewGameListener(this.newGame.bind(this));
    this.gamePlay.addSaveGameListener(this.onSaveGameListener.bind(this));
    this.gamePlay.addLoadGameListener(this.onLoadGameListener.bind(this));
  }

  removeEvents() {
    this.gamePlay.removeAllListeners();
  }

  onCellClick(index) {
    if (this.state.pointerActiveLocked) {
      return;
    }

    const elem = this.gamePlay.cells[index];
    const character = elem.querySelector('.character');

    if (this.state.motion % 2 === 0 && character && !this.activeCharacter) {
      this.state.positionedCharacters.forEach(elem => {
        if (elem.position === index && !elem.isPlayer) {
          GamePlay.showError('Персонаж недоступен');
        } else if (elem.position === index && elem.isPlayer) {
          this.gamePlay.cells.forEach((cell, i) => {
            if (cell.className.indexOf('selected-yellow') > -1) {
              this.gamePlay.deselectCell(i);
            } else {
              this.setActiveCharacter(elem, index);
            }
          });
        }
      });
    } else if (this.state.motion % 2 === 0 && character && this.activeCharacter) {
      this.state.positionedCharacters.forEach(elem => {
        if (elem.position === index && !elem.isPlayer && this.activeCharacter.determiningRadiusAttack(index, this.gamePlay.boardSize)) {
          const damage = this.activeCharacter.character.getDamage(elem.character);

          if (elem.character.health - damage > 0) {
            elem.character.health = elem.character.health - damage;
          } else {
            this.state.positionedCharacters = this.state.positionedCharacters.filter(character => character.position !== elem.position);
          }

          this.gamePlay.showDamage(index, damage).then(() => {
            this.gamePlay.deselectCell(this.activeCharacter.position);
            this.removSelected(index, this.state.positionedCharacters.filter(character => character.condition !== 'dead'));
          });
        } else if (elem.position === index && elem.isPlayer) {
          this.gamePlay.cells.forEach((cell, i) => {
            if (cell.className.indexOf('selected-yellow') > -1) {
              this.gamePlay.deselectCell(i);
            } else {
              this.setActiveCharacter(elem, index);
            }
          });
        }
      });
    } else if (this.state.motion % 2 === 0 && this.activeCharacter && this.activeCharacter.determiningRadiusMotion(index, this.gamePlay.boardSize)) {
      this.state.positionedCharacters.forEach(elem => {
        if (elem.position === this.activeCharacter.position) {
          this.gamePlay.deselectCell(this.activeCharacter.position);

          elem.position = index;
        }
      });

      this.removSelected(index, this.state.positionedCharacters.filter(character => character.condition !== 'dead'));
    }
    // TODO: react to click
  }

  onCellEnter(index) {
    if (this.state.pointerActiveLocked) {
      return;
    }

    const cell = this.gamePlay.cells[index];
    const character = cell.querySelector('.character');
    let message;

    if (this.state.motion % 2 === 0 && character) {
      this.state.positionedCharacters.forEach(elem => {
        if (elem.position === index) {
          message = this.getMessage(elem.character);

          if (!elem.isPlayer && this.activeCharacter) {
            
            if (this.activeCharacter.determiningRadiusAttack(index, this.gamePlay.boardSize)) {
              this.gamePlay.selectCell(index, 'red');
              this.gamePlay.setCursor(cursors.crosshair);
            } else {
              this.gamePlay.setCursor(cursors.notallowed);
            }
          } else if (!this.activeCharacter) {
            this.gamePlay.setCursor(cursors.auto);
            this.gamePlay.deselectCell(index);
          }
        }
      });

      this.gamePlay.showCellTooltip(message, index);
    } else if (this.state.motion % 2 === 0 && this.activeCharacter) {
      if (this.activeCharacter.determiningRadiusMotion(index, this.gamePlay.boardSize)) {
        this.gamePlay.selectCell(index, 'green');
      } else {
        this.gamePlay.setCursor(cursors.notallowed);
      }
    } else if (!this.activeCharacter) {
      this.gamePlay.setCursor(cursors.auto);
      this.gamePlay.deselectCell(index);
    }
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    if (this.state.pointerActiveLocked) {
      return;
    }

    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.setCursor(cursors.pointer);
    this.gamePlay.cells[index].classList.remove('selected-green');
    this.gamePlay.cells[index].classList.remove('selected-red');
    // TODO: react to mouse leave
  }
  
  setActiveCharacter(elem, index) {
    this.activeCharacter = elem;

    this.gamePlay.selectCell(index);
  }

  removSelected(index, arrayCharacters) {
    this.gamePlay.redrawPositions(arrayCharacters);
    this.onCellLeave(index);

    this.state.motion += 1;
    this.activeCharacter = null;
    
    if (this.state.motion % 2 != 0) {
      this.goOpponent();
    }
  }

  getMessage(character) {
    return `\u{1F396} ${character.level} \u2694 ${character.attack} \u{1F6E1} ${character.defence} \u2764 ${character.health}`;
  }

  goOpponent() {
    let charactersOpponent = [];
    let charactersPlayer = [];
    let step = false;
    let possiblePositions = {};
    let ignorePositions = [];

    this.state.positionedCharacters.forEach(character => {
      ignorePositions.push(character.position);
    });

    this.state.positionedCharacters.forEach(character => {
      if (!character.isPlayer) {
        charactersOpponent.push(character);
      } else if (character.condition === 'live') {
        charactersPlayer.push(character);
      }
    });

    if (charactersOpponent.length === 0) {
      if (this.state.lvlGame === 0) {
        this.state.victory += 1;

        this.lvlUpGame(3);
      } else if (this.state.lvlGame === 3) {
        this.state.victory += 1;
        this.state.pointerActiveLocked = true;
      } else {
        this.state.victory += 1;

        this.lvlUpGame(5);
      }
    }
    
    charactersOpponent.sort((a,b) => (b.character.level - a.character.level));
    charactersPlayer.sort((a,b) => (b.character.level - a.character.level));

    charactersOpponent.forEach((characterOpponent, index) => {
      possiblePositions[index] = [];

      for (let i = 0; i < this.gamePlay.boardSize ** 2; i += 1) {
        if (characterOpponent.determiningRadiusMotion(i, this.gamePlay.boardSize) && !ignorePositions.includes(i) && i !== characterOpponent.position) {
          possiblePositions[index].push(i);
        }
      }
    });

    charactersOpponent.forEach(characterOpponent => {
      charactersPlayer.forEach(characterPlayer => {
        if (step) {
          return;
        }

        if (characterOpponent.determiningRadiusAttack(characterPlayer.position, this.gamePlay.boardSize)) {
          step = true;
          this.activeCharacter = characterOpponent;

          this.gamePlay.selectCell(this.activeCharacter.position);
          this.gamePlay.selectCell(characterPlayer.position, 'red');

          const damage = this.activeCharacter.character.getDamage(characterPlayer.character);
          
          if (characterPlayer.character.health - damage > 0) {
            characterPlayer.character.health = characterPlayer.character.health - damage;
          } else {
            this.state.positionedCharacters.forEach(character => {
              if (character.position === characterPlayer.position) {
                character.condition = 'dead';
              }
            });

            charactersPlayer = charactersPlayer.filter(characterP => characterP.position !== characterPlayer.position);
          }
          
          this.gamePlay.showDamage(characterPlayer.position, damage).then(() => {
            this.gamePlay.deselectCell(this.activeCharacter.position);
            this.gamePlay.deselectCell(characterPlayer.position);
            this.removSelected(this.activeCharacter.position, this.state.positionedCharacters.filter(character => character.condition !== 'dead'));
          });
    
          if (charactersPlayer.length === 0) {
            this.state.pointerActiveLocked = true;
            this.state.defeat += 1;
          }
        }
      });
    });

    if (step) {
      return;
    }

    charactersOpponent.forEach((characterOpponent, index) => {
      possiblePositions[index].forEach(possiblePosition => {
        
        charactersPlayer.forEach(characterPlayer => {
          if (step) {
            return;
          }

          const oldPosition = characterOpponent.position;
          characterOpponent.position = possiblePosition;

          if (characterOpponent.determiningRadiusAttack(characterPlayer.position, this.gamePlay.boardSize)) {
            step = true;

            this.gamePlay.selectCell(possiblePosition, 'green');

            characterOpponent.position = oldPosition;
            this.activeCharacter = characterOpponent;
            this.gamePlay.selectCell(this.activeCharacter.position);
            this.activeCharacter.position = possiblePosition;
            this.gamePlay.deselectCell(this.activeCharacter.position);
            this.gamePlay.deselectCell(oldPosition);
            this.removSelected(possiblePosition, this.state.positionedCharacters.filter(character => character.condition !== 'dead'));
    
            if (charactersPlayer.length === 0) {
              this.state.pointerActiveLocked = true;
              this.state.defeat += 1;
            }
          } else {
            step = true;
            characterOpponent.position = oldPosition;
            let randomIndexCharacter = getRandomInt(0, charactersOpponent.length - 1);
            let randomIndexPosition = getRandomInt(0, possiblePositions[randomIndexCharacter].length - 1);
            let randomPosition = possiblePositions[randomIndexCharacter][randomIndexPosition];
            this.activeCharacter = charactersOpponent[randomIndexCharacter];

            this.gamePlay.selectCell(this.activeCharacter.position);
            this.gamePlay.selectCell(randomPosition, 'green');

            this.state.positionedCharacters.forEach(elem => {
              if (elem.position === this.activeCharacter.position) {
                this.gamePlay.deselectCell(this.activeCharacter.position);
                this.gamePlay.deselectCell(randomPosition);
                
                elem.position = randomPosition;
              }
            });

            this.removSelected(randomPosition, this.state.positionedCharacters.filter(character => character.condition !== 'dead'));
    
            if (charactersPlayer.length === 0) {
              this.state.pointerActiveLocked = true;
              this.state.defeat += 1;
            }
          }
        });
      })
    });
  }
}
