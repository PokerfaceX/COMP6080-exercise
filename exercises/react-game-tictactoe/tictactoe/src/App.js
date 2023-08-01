import "./App.css";
import React from "react";

function App() {
  const emptyBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [board, setBoard] = React.useState(emptyBoard);
  const [turn, setTurn] = React.useState("X");
  const [winningTiles, setWinningTiles] = React.useState([]);
  const [winner, setWinner] = React.useState("");

  const handleTurn = (x, y) => {
    if (!winner && board[x][y] === "") {
      let newBoard = [...board];
      newBoard[x][y] = turn;
      setBoard(newBoard);
      if (checkWin(board, turn)) {
        const winningTimes = localStorage.getItem(`WINNER_${turn}`);
        localStorage.setItem(
          `WINNER_${turn}`,
          !winningTimes ? 1 : parseInt(winningTimes) + 1
        );
        setWinner(turn);
      }
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  const checkWin = (board, player) => {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      ) {
        setWinningTiles([
          [i, 0],
          [i, 1],
          [i, 2],
        ]);
        return true;
      }

      if (
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      ) {
        setWinningTiles([
          [0, i],
          [1, i],
          [2, i],
        ]);
        return true;
      }
    }

    // Check diagonals
    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    ) {
      setWinningTiles([
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
      return true;
    }
    if (
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    ) {
      setWinningTiles([
        [0, 2],
        [1, 1],
        [2, 0],
      ]);
      return true;
    }

    return false;
  };

  const checkWinner = (x, y) => {
    let won = false;
    winningTiles.forEach((element) => {
      if (element[0] === x && element[1] === y) {
        won = true;
      }
    });
    return won ? "winner" : "";
  };

  return (
    <div className="board">
      {board.map((element, x, array) => {
        return (
          <div key={x} className="row">
            {element.map((value, y) => {
              return (
                <button
                  key={y}
                  className={checkWinner(x, y)}
                  onClick={() => handleTurn(x, y)}>
                  {value}
                </button>
              );
            })}
          </div>
        );
      })}
      {winner === "" ? "" : `the winner is ${winner};`}
    </div>
  );
}

export default App;
