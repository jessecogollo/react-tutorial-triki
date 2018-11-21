import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { Appbar, Button, Container } from 'muicss/react';
// import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
// import Container from 'muicss/lib/react/container';

function Square(props) {
  return (
    <Button
        className="square"
        style={{background: `${props.background}` }}
        onClick={() => props.onClick() }
      >
        { props.value }
      </Button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      background= {this.props.background[i]}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      key={i+10}
    />;
  }

  render() {
    let boardRow = [];
    let count = 0;
    for (let i = 0; i <= 2; i++) {
      boardRow.push(<div className="board-row" key={i}></div>)
      for (let j = 0; j <= 2; j++) {
        boardRow.push(this.renderSquare(count));
        count++;
      }
    }
    return (<div>
      {boardRow}
    </div>)
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        background: Array(9).fill('white'),
        coordinates: ''
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const background = current.background.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      background[winner.positionWinner[0]] = 'blue';
      background[winner.positionWinner[1]] = 'blue';
      background[winner.positionWinner[2]] = 'blue';
      this.setState({
        history: history.concat([{
          background: background
        }])
      });
      return;
    }
    const coordinates = getCoordinates(i);
    squares[i] = this.state.xIsNext ? 'X' : '0';
    background[i] = 'white';
    this.setState({
      history: history.concat([{
        squares: squares,
        coordinates: coordinates,
        background: background
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
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
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} ${step.coordinates}` :
        'Go to game start';
      return (
        <li key={move}>
          <Button className="primary" variant="raised"  onClick={() => this.jumpTo(move)}>
            {(move === this.state.stepNumber ? <b>{desc}</b> : desc)}
          </Button>
        </li>
      )
    });
    let status;
    if(winner) {
      current.background[winner.positionWinner[0]] = 'green';
      current.background[winner.positionWinner[1]] = 'green';
      current.background[winner.positionWinner[2]] = 'green';
      status = `Winner ${winner.winner} - ${winner.positionWinner}`;
    } else {
      status = `Next player: ${(this.state.xIsNext ? 'X' : '0')}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            background={current.background}
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
