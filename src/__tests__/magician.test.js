import Magician from '../js/characters/magician';
import Character from '../js/Character';

test.each([
  [1, 'magician', 
    {
      type: 'magician', 
      health: 50,
      level: 1,
      attack: 10,
      defence: 40,
      radiusAttack: 4,
      radiusMotion: 1
    }
  ],
  [3, undefined,
    {
      type: 'magician', 
      health: 50,
      level: 3,
      attack: 30,
      defence: 120,
      radiusAttack: 4,
      radiusMotion: 1
    }
  ]
])// eslint-disable-next-line
('testin Character class with %s level and %s type', (level, type, expected) => {
  const result = new Magician(level, type);
  expect(result).toEqual(expected);
});

test.each([
  [0, 'magician', new Error("Уровень должно быть не менее 1 и не более 4")],
  [10, 'magician', new Error("Уровень должно быть не менее 1 и не более 4")]
])// eslint-disable-next-line
('testin throws Error with %s level and %s type', (level, type, expected) => {
  function result() {
    new Magician(level, type);
  }
  expect(result).toThrow(expected);
});

test.each([
  [3, 'magician', new Error("Невозможно создать персонажа")],
  [1, 'magician', new Error("Невозможно создать персонажа")]
])// eslint-disable-next-line
('testin throws Error with Character class', (level, type, expected) => {
  function result() {
    new Character(level, type);
  }
  expect(result).toThrow(expected);
});
