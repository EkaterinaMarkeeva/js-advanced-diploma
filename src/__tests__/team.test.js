import Team from '../js/Team';
import Bowman from '../js/characters/bowman';
import Daemon from '../js/characters/daemon';
import Magician from '../js/characters/magician';
import Swordsman from '../js/characters/swordsman';
import Undead from '../js/characters/undead';
import Vampire from '../js/characters/vampire';

test.each([
  [
    [new Magician(2), new Undead(3)],
    [
      {
        level: 2,
        attack: 20,
        defence: 80,
        health: 50,
        type: 'magician',
        radiusAttack: 4,
        radiusMotion: 1
      },
      {
        level: 3,
        attack: 120,
        defence: 30,
        health: 50,
        type: 'undead',
        radiusAttack: 1,
        radiusMotion: 4
      }
    ]
  ],
  [
    [new Vampire(1), new Daemon(4)],
    [
      {
        level: 1,
        attack: 25,
        defence: 25,
        health: 50,
        type: 'vampire',
        radiusAttack: 2,
        radiusMotion: 2
      },
      {
        level: 4,
        attack: 40,
        defence: 40,
        health: 50,
        type: 'daemon',
        radiusAttack: 4,
        radiusMotion: 1
      }
    ]
  ],
  [
    [new Swordsman(2), new Bowman(3)],
    [
      {
        level: 2,
        attack: 80,
        defence: 20,
        health: 50,
        type: 'swordsman',
        radiusAttack: 1,
        radiusMotion: 4
      },
      {
        level: 3,
        attack: 75,
        defence: 75,
        health: 50,
        type: 'bowman',
        radiusAttack: 2,
        radiusMotion: 2
      }
    ]
  ]
])// eslint-disable-next-line
('testing class Team', (characters, expected) => {
  const result = new Team(characters);

  result.characters.forEach((character, index) => {
    expect(character).toEqual(expected[index]);
  });
});
