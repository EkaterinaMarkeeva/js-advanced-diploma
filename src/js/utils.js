/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  if (index < 0 || index >= boardSize ** 2) {
    throw new Error('Вне поля');
  }
  
  if (index === 0) {
    return 'top-left';
  }

  if (index === boardSize - 1) {
    return 'top-right';
  }

  if (index === (boardSize ** 2 - 1)) {
    return 'bottom-right';
  }

  if (index === boardSize * (boardSize - 1)) {
    return 'bottom-left';
  }

  if (index < boardSize) {
    return 'top';
  }

  if (index > boardSize * (boardSize - 1) && index < boardSize ** 2 - 1) {
    return 'bottom';
  }

  for (let i = 1; i < boardSize - 1; i += 1) {
    if (index === boardSize * i) {
      return 'left';
    }
  }

  for (let i = 2; i < boardSize; i += 1) {
    if (index === (boardSize * i - 1)) {
      return 'right';
    }
  }
  
  // TODO: ваш код будет тут
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
