import Bowman from '../js/characters/bowman';
import Character from '../js/Character';

test.each([
  [1, 'bowman', 
    {
      type: 'bowman', 
      health: 50,
      level: 1,
      attack: 25,
      defence: 25,
      radiusAttack: 2,
      radiusMotion: 2
    }
  ],
  [3, undefined,
    {
      type: 'bowman', 
      health: 50,
      level: 3,
      attack: 75,
      defence: 75,
      radiusAttack: 2,
      radiusMotion: 2
    }
  ]
])// eslint-disable-next-line
('testin Character class with %s level and %s type', (level, type, expected) => {
  const result = new Bowman(level, type);
  expect(result).toEqual(expected);
});

test.each([
  [0, 'bowman', new Error("Уровень должно быть не менее 1 и не более 4")],
  [10, 'bowman', new Error("Уровень должно быть не менее 1 и не более 4")]
])// eslint-disable-next-line
('testin throws Error with %s level and %s type', (level, type, expected) => {
  function result() {
    new Bowman(level, type);
  }
  expect(result).toThrow(expected);
});

test.each([
  [3, 'bowman', new Error("Невозможно создать персонажа")],
  [1, 'bowman', new Error("Невозможно создать персонажа")]
])// eslint-disable-next-line
('testin throws Error with Character class', (level, type, expected) => {
  function result() {
    new Character(level, type);
  }
  expect(result).toThrow(expected);
});
