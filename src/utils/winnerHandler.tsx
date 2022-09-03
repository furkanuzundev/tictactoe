export const checkWinner = (board, point, mark) => {
  let horizontal = checkHorizontal(board, point, mark);
  if (horizontal) {
    return horizontal;
  }

  let vertical = checkVertical(board, point, mark);
  if (vertical) {
    return vertical;
  }

  let diagonal = checkDiagonal(board, point, mark);
  if (diagonal) {
    return diagonal;
  }

  let reverseDianogal = checkReverseDiagonal(board, point, mark);
  if (reverseDianogal) {
    return reverseDianogal;
  }
};

const checkHorizontal = (board, point, mark) => {
  let array: Array = [];
  Object.values(board[point.x]).forEach((item, index) => {
    if (array.length === 3) {
      return;
    }
    if (item === mark) {
      array.push({x: point.x, y: index});
    }

    if (item !== mark && array.length < 3) {
      array = [];
    }
  });

  return array.length === 3 && array;
};

const checkVertical = (board, point, mark) => {
  let array: Array = [];

  Object.keys(board).forEach(row => {
    if (array.length === 3) {
      return;
    }
    if (board[row][point.y] === mark) {
      array.push({x: row, y: point.y});
    }

    if (board[row][point.y] !== mark && array.length < 3) {
      array = [];
    }
  });

  return array.length === 3 && array;
};

const checkDiagonal = (board, point, mark) => {
  const length = Object.keys(board).length;
  const diff = point.x - point.y;

  if (diff >= 0) {
    let array = [];

    for (let column = 0, row = diff; row <= length - 1; column++, row++) {
      if (array.length === 3) {
        break;
      }
      if (board[row][column] === mark) {
        array.push({x: row, y: column});
      }

      if (board[row][column] !== mark && array.length < 3) {
        array = [];
      }
    }
    return array.length === 3 && array;
  } else {
    let array = [];

    for (
      let row = 0, column = Math.abs(diff);
      column <= length - 1;
      column++, row++
    ) {
      if (array.length === 3) {
        break;
      }
      if (board[row][column] === mark) {
        array.push({x: row, y: column});
      }

      if (board[row][column] !== mark && array.length < 3) {
        array = [];
      }
    }
    return array.length === 3 && array;
  }
};

const checkReverseDiagonal = (board, point, mark) => {
  const length = Object.keys(board).length - 1;
  const sum = point.x + point.y;

  const startRow = sum > length ? sum - length : 0;
  const startColumn = sum > length ? length : sum;
  const limit = sum > length ? length : sum;

  let array = [];

  for (
    let row = startRow, column = startColumn;
    row <= limit;
    row++, column--
  ) {
    if (array.length === 3) {
      break;
    }
    if (board[row][column] === mark) {
      array.push({x: row, y: column});
    }

    if (board[row][column] !== mark && array.length < 3) {
      array = [];
    }
  }

  return array.length === 3 && array;
};
