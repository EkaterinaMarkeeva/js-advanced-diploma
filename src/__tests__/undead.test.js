import Undead from '../js/characters/undead';
import Character from '../js/Character';

test.each([
  [1, 'undead', 
    {
      type: 'undead', 
      health: 50,
      level: 1,
      attack: 40,
      defence: 10,
      radiusAttack: 1,
      radiusMotion: 4
    }
  ],
  [3, undefined,
    {
      type: 'undead', 
      health: 50,
      level: 3,
      attack: 120,
      defence: 30,
      radiusAttack: 1,
      radiusMotion: 4
    }
  ]
])// eslint-disable-next-line
('testin Character class with %s level and %s type', (level, type, expected) => {
  const result = new Undead(level, type);
  expect(result).toEqual(expected);
});

test.each([
  [0, 'undead', new Error("Уровень должно быть не менее 1 и не более 4")],
  [10, 'undead', new Error("Уровень должно быть не менее 1 и не более 4")]
])// eslint-disable-next-line
('testin throws Error with %s level and %s type', (level, type, expected) => {
  function result() {
    new Undead(level, type);
  }
  expect(result).toThrow(expected);
});

test.each([
  [3, 'undead', new Error("Невозможно создать персонажа")],
  [1, 'undead', new Error("Невозможно создать персонажа")]
])// eslint-disable-next-line
('testin throws Error with Character class', (level, type, expected) => {
  function result() {
    new Character(level, type);
  }
  expect(result).toThrow(expected);
});
