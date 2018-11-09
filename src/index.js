import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  console.log(' Square props', props);
  return (
    <button
        className="square"
        onClick={() => props.onClick() }
      >
        { props.value }
      </button>
  )
}

class Board extends React.Component {
    renderSquare(i) {
    console.log('this.props', this.props);
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      position: 0
    }
  }
  handleClick(i) {
    console.log('i', i);
    console.log('handleClick this.state.history', this.state.history);
    console.log('handleClick this.state.stepNumber', this.state.stepNumber);
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log('handleClick history', history);
    const current = history[history.length - 1];
    // console.log('handleClick current.squares0', current.squares);
    const squares = current.squares.slice();
    // console.log('handleClick squares0', squares);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // console.log('handleClick squares1', squares);
    squares[i] = this.state.xIsNext ? 'X' : '0';
    // console.log('handleClick squares2', squares);
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      position: i
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }
  render() {
    const history = this.state.history;
    console.log('render history', history);
    const current = history[this.state.stepNumber];
    console.log('render current', current);
    const winner = calculateWinner(current.squares);
    console.log('render winner', winner);
    // const position = this.state.position;
    // const coordinates = getCoordinates(position);
    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move}` :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });
    let status;
    if(winner) {
      status = `Winner ${winner}`;
    } else {
      status = `Next player: ${(this.state.xIsNext ? 'X' : '0')}`;
    }
    return (
      <div className="game">
        <div className="game-board">
        <h4>@jessecogollo</h4>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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
      return squares[a];
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
}