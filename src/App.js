import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


// stateless component; only contains a render method = functional component
function Square(props) {
  return (
      // square receives its value from its parent Board and informs its parent when it's clicked: controlled component
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export class Board extends Component {
  constructor() {
    //explicitly call super when defining the constructor of a subclass
    super();
      // estatblishes state
      this.state = {
        // initial state for Board containing array of 9 nulls, corresponding to the 9 squares
        squares: Array(9).fill(null),
        // x moves first
        xIsNext: true,
      };

  }
  handleClick(i) {
    //slice to copy the squares array instead of mutating the existing array
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i])
    // ternary that sets player turn to x or o depending on the boolean value
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }
  renderSquare(i) {
    //passes props of value and onClick each square down
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }
  render() {
    //checks for winner each time the function is called
    const winner = calculateWinner(this.state.squares);

    // status recieves boolean from state to display whose turn
    let status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    return (
      <div>
        <div className="status">{status}</div>
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

export class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
