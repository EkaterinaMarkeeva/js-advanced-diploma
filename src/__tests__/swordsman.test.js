import Swordsman from '../js/characters/swordsman';
import Character from '../js/Character';

test.each([
  [1, 'swordsman', 
    {
      type: 'swordsman', 
      health: 50,
      level: 1,
      attack: 40,
      defence: 10,
      radiusAttack: 1,
      radiusMotion: 4
    }
  ],
  [2, undefined,
    {
      type: 'swordsman', 
      health: 50,
      level: 2,
      attack: 80,
      defence: 20,
      radiusAttack: 1,
      radiusMotion: 4
    }
  ]
])// eslint-disable-next-line
('testin Character class with %s level and %s type', (level, type, expected) => {
  const result = new Swordsman(level, type);
  expect(result).toEqual(expected);
});

test.each([
  [0, 'swordsman', new Error("Уровень должно быть не менее 1 и не более 4")],
  [10, 'swordsman', new Error("Уровень должно быть не менее 1 и не более 4")]
])// eslint-disable-next-line
('testin throws Error with %s level and %s type', (level, type, expected) => {
  function result() {
    new Swordsman(level, type);
  }
  expect(result).toThrow(expected);
});

test.each([
  [3, 'swordsman', new Error("Невозможно создать персонажа")],
  [1, 'swordsman', new Error("Невозможно создать персонажа")]
])// eslint-disable-next-line
('testin throws Error with Character class', (level, type, expected) => {
  function result() {
    new Character(level, type);
  }
  expect(result).toThrow(expected);
});
