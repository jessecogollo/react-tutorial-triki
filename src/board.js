import React from './util/react';
import Square from './square.js';

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

export default Board;