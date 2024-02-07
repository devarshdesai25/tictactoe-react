import React, { useState, useEffect } from "react";
import Board from "./Board";
import GameState from "./GameState";
import GameOver from "./GameOver";
import Reset from "./Reset";
const PLAYER_X = "X";
const PLAYER_O = "O";
let WINNER = "";
const tileWin = []; //will contain the indices of tiles that show win

export default function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [gameState, setGameState] = useState(GameState.inProgress);
  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) return;
    if (tiles[index] !== null) return; //if the tile is already filled then we return
    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
  };

  const handleReset = () => {
    setTiles(Array(9).fill(null));
    document.getElementById("player-text").style.display = "block";
    setPlayerTurn(PLAYER_X);
    setGameState(GameState.inProgress);
    WINNER = "";
    const tileClassElements = Array.from(
      document.getElementsByClassName("tile")
    );
    const tileWinElements = tileClassElements.filter((ele, index) => {
      return tileWin.includes(index);
    });
    tileWinElements.forEach((element) => {
      element.classList.remove("tile-win");
    });
  };

  const checkWinner = () => {
    if (WINNER !== "") return;
    for (let i = 0; i < 9; i += 3) {
      if (
        tiles[i] !== null &&
        tiles[i] === tiles[i + 1] &&
        tiles[i + 1] === tiles[i + 2]
      ) {
        WINNER = tiles[i];
        tileWin.push(i, i + 1, i + 2);
        break;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        tiles[i] !== null &&
        tiles[i] === tiles[i + 3] &&
        tiles[i + 3] === tiles[i + 6]
      ) {
        WINNER = tiles[i];
        tileWin.push(i, i + 3, i + 6);
        break;
      }
    }

    if (tiles[0] !== null && tiles[0] === tiles[4] && tiles[4] === tiles[8]) {
      WINNER = tiles[0];
      tileWin.push(0, 4, 8);
    }

    if (tiles[2] !== null && tiles[2] === tiles[4] && tiles[4] === tiles[6]) {
      WINNER = tiles[0];
      tileWin.push(2, 4, 6);
    }
    if (WINNER === "")
      WINNER = tiles.every((ele) => ele !== null) ? "DRAW" : "";

    if (WINNER !== "") {
      document.getElementById("player-text").style.display = "none";
      if (WINNER === "DRAW") {
        setGameState(GameState.draw);
        return;
      }
      setGameState(
        WINNER === PLAYER_X ? GameState.PlayerXWins : GameState.PlayerOWins
      );
      const tileClassElements = Array.from(
        document.getElementsByClassName("tile")
      );
      const tileWinElements = tileClassElements.filter((ele, index) => {
        return tileWin.includes(index);
      });
      tileWinElements.forEach((element) => {
        element.classList.add("tile-win");
      });
    }
  };
  useEffect(
    () => {
      checkWinner();
    },
    //eslint-disable-next-line
    [tiles]
  );
  return (
    <div className="tic-tac-toe">
      <h1 className="h1-text">Tic Tac Toe</h1>
      <h2 id="player-text">{playerTurn}'s Turn</h2>
      <Board tiles={tiles} handleTileClick={handleTileClick} />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
}
