import GameController from '../js/GameController';

test.each([
  [
    {
      level: 2,
      attack: 20,
      defence: 80,
      health: 50,
      type: 'magician'
    },
    `\u{1F396} 2 \u2694 20 \u{1F6E1} 80 \u2764 50`
  ],
  [
    {
      level: 3,
      attack: 120,
      defence: 30,
      health: 50,
      type: 'Swordsman'
    },
    `\u{1F396} 3 \u2694 120 \u{1F6E1} 30 \u2764 50`
  ]
])// eslint-disable-next-line
('testing method getMessage', (character, expected) => {
  const gameController = new GameController();
  const result = gameController.getMessage(character);

  expect(result).toBe(expected);
});
