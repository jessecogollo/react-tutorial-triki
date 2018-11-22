function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i=0; i< lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner:squares[a],
        positionWinner: lines[i]
      };
    }
  }
  return null;
};

function getCoordinates(position) {
  switch (position) {
    case 0:
      return '(0, 0)'
    case 1:
      return '(0, 1)'
    case 2:
      return '(0, 2)'
    case 3:
      return '(1, 0)'
    case 4:
      return '(1, 1)'
    case 5:
      return '(1, 2)'
    case 6:
      return '(2, 0)'
    case 7:
      return '(2, 1)'
      case 8:
      return '(2, 2)'
    default:
      return '';
  }
};

export {
  calculateWinner,
  getCoordinates
}