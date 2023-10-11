import { characterGenerator, generateTeam } from '../js/generators';
import Bowman from '../js/characters/bowman';
import Daemon from '../js/characters/daemon';
import Magician from '../js/characters/magician';
import Swordsman from '../js/characters/swordsman';
import Undead from '../js/characters/undead';
import Vampire from '../js/characters/vampire';

test.each([
  [
    [Bowman, Swordsman, Magician],
  3
]
])// eslint-disable-next-line
('testing function* characterGenerator', (allowedTypes, maxLevel) => {
  let result = characterGenerator(allowedTypes, maxLevel);
  expect(result.next().value !== result.next().value).toEqual(true);
});

test.each([
  [
    [Bowman, Swordsman, Magician],
    3,
    4,
    4
  ],
  [
    [Undead, Vampire, Daemon],
    2,
    4,
    3
  ]
])// eslint-disable-next-line
('testing function generateTeam', (allowedTypes, maxLevel, characterCount, expected) => {
  const result = generateTeam(allowedTypes, maxLevel, characterCount);
  result.characters.forEach(character => expect(character.level < expected).toEqual(true));
});
