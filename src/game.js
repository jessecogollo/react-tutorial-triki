import React from './util/react';
import Button from 'muicss/lib/react/button';
import Board from './board'
import {
  calculateWinner,
  getCoordinates
} from './util/index'
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
    } else if(this.state.stepNumber === 9) {
      status = `Draw`
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

export default Game;