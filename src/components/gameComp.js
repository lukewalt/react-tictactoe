// require components
import React from 'react';
import Board from './boardComp';


class Game extends React.Component {
  // establishes state of the game
  constructor() {
    super();
    this.state = {
      // saves each state change to an array of objects with a representation of each current move reflected in an array;
      history: [{
        squares: Array(9).fill(null)
      }],
      // counts each move
      stepNumber: 0,
      // handles turn
      xIsNext: true
    };
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // checks for winner or if all square are taken
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // determines if the clicked sqaure should display an X or O
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // updates state of game to current values
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // allows the clickable list items to view the state associated to each move
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    })
  }

  // implements all of the components above
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game Start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}> {desc} </a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // appends logic to a virtual dom
    return (

      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="info-title">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>

    );
  }
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

export default Game
