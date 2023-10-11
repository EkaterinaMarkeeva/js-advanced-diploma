import Vampire from '../js/characters/vampire';
import Character from '../js/Character';

test.each([
  [1, 'vampire', 
    {
      type: 'vampire', 
      health: 50,
      level: 1,
      attack: 25,
      defence: 25,
      radiusAttack: 2,
      radiusMotion: 2
    }
  ],
  [4, undefined,
    { 
      type: 'vampire', 
      health: 50,
      level: 4,
      attack: 100,
      defence: 100,
      radiusAttack: 2,
      radiusMotion: 2
    }
  ]
])// eslint-disable-next-line
('testin Character class with %s level and %s type', (level, type, expected) => {
  const result = new Vampire(level, type);
  expect(result).toEqual(expected);
});

test.each([
  [0, 'vampire', new Error("Уровень должно быть не менее 1 и не более 4")],
  [10, 'vampire', new Error("Уровень должно быть не менее 1 и не более 4")]
])// eslint-disable-next-line
('testin throws Error with %s level and %s type', (level, type, expected) => {
  function result() {
    new Vampire(level, type);
  }
  expect(result).toThrow(expected);
});

test.each([
  [3, 'vampire', new Error("Невозможно создать персонажа")],
  [1, 'vampire', new Error("Невозможно создать персонажа")]
])// eslint-disable-next-line
('testin throws Error with Character class', (level, type, expected) => {
  function result() {
    new Character(level, type);
  }
  expect(result).toThrow(expected);
});
