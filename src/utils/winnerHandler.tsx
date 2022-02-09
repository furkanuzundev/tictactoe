export const checkWinner = (board, point, mark) => {
  //checkHorizontal(board, point, mark);
  //console.log('checkDiagonal : ', checkDiagonal(board, point, mark));
  console.log(
    'checkReverseDiagonal : ',
    checkReverseDiagonal(board, point, mark),
  );

  //console.log('checkVertical : ', checkVertical(board, point, mark));
};

const checkHorizontal = (board, point, mark) => {
  //board, point, mark

  let array = [];
  Object.values(board[point.x]).forEach(item => {
    if (array.length === 3) {
      return;
    }
    if (item === mark) {
      array.push(item);
    }

    if (item !== mark && array.length < 3) {
      array = [];
    }
  });

  return array.length === 3;
};

const checkVertical = (board, point, mark) => {
  let array = [];

  Object.keys(board).forEach(row => {
    if (array.length === 3) {
      return;
    }
    if (board[row][point.y] === mark) {
      array.push(board[row][point.y]);
    }

    if (board[row][point.y] !== mark && array.length < 3) {
      array = [];
    }
  });

  return array.length === 3;
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
        array.push(board[row][column]);
      }

      if (board[row][column] !== mark && array.length < 3) {
        array = [];
      }
    }
    return array.length === 3;
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
        array.push(board[row][column]);
      }

      if (board[row][column] !== mark && array.length < 3) {
        array = [];
      }
    }
    return array.length === 3;
  }
};

const checkReverseDiagonal = (board, point, mark) => {
  const length = Object.keys(board).length;
  const sum = point.x + point.y;

  const startRow = sum > length ? sum - length : 0;
  const startColumn = sum > length ? length : sum;
  const limit = sum > length ? length : sum;

  console.log('sum : ', sum);
  let array = [];

  for (let row = startRow, column = startColumn; row < limit; row++, column--) {
    console.log('row: ', row, 'column :', column);
    if (array.length === 3) {
      break;
    }
    if (board[row][column] === mark) {
      array.push(board[row][column]);
    }

    if (board[row][column] !== mark && array.length < 3) {
      array = [];
    }
  }

  return array.length === 3;
};
