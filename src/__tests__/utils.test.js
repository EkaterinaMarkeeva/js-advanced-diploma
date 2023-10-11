import { calcTileType } from '../js/utils';

test.each([
  ['top-left', 0, 8],
  ['top-right', 7, 8],
  ['bottom-right', 63, 8],
  ['bottom-left', 20, 5],
  ['left', 10, 5],
  ['right', 9, 5],
  ['top', 2, 6],
  ['bottom', 34, 6],
  ['center', 8, 5]
])// eslint-disable-next-line
('testin calcTileType function with cell type %s index %i', (expected, index, boardSize) => {
  const result = calcTileType(index, boardSize);
  expect(result).toBe(expected);
});

test.each([
  ['error', 64, 8, new Error('Вне поля')],
  ['error', -1, 8, new Error('Вне поля')]
])// eslint-disable-next-line
('testin calcTileType function with cell type %s index %i', (_, index, boardSize, expected) => {
  function result() {
    calcTileType(index, boardSize);
  }

  expect(result).toThrow(expected);
});
