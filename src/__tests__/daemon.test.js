import Daemon from '../js/characters/daemon';
import Character from '../js/Character';

test.each([
  [2, 'daemon', 
    { 
      type: 'daemon', 
      health: 50,
      level: 2,
      attack: 20,
      defence: 20,
      radiusAttack: 4,
      radiusMotion: 1
    }
  ],
  [1, undefined,
    { 
      type: 'daemon', 
      health: 50,
      level: 1,
      attack: 10,
      defence: 10,
      radiusAttack: 4,
      radiusMotion: 1
    }
  ]
])// eslint-disable-next-line
('testin Character class with %s level and %s type', (level, type, expected) => {
  const result = new Daemon(level, type);
  expect(result).toEqual(expected);
});

test.each([
  [0, 'daemon', new Error("Уровень должно быть не менее 1 и не более 4")],
  [10, 'daemon', new Error("Уровень должно быть не менее 1 и не более 4")]
])// eslint-disable-next-line
('testin throws Error with %s level and %s type', (level, type, expected) => {
  function result() {
    new Daemon(level, type);
  }
  expect(result).toThrow(expected);
});

test.each([
  [3, 'daemon', new Error("Невозможно создать персонажа")],
  [1, 'daemon', new Error("Невозможно создать персонажа")]
])// eslint-disable-next-line
('testin throws Error with Character class', (level, type, expected) => {
  function result() {
    new Character(level, type);
  }
  expect(result).toThrow(expected);
});
