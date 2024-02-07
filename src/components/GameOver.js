import React from "react";
import GameState from "./GameState";
export default function GameOver({ gameState }) {
  switch (gameState) {
    case GameState.inProgress:
      return <></>;
    case GameState.PlayerXWins:
      return <div className="game-over">X wins</div>;
    case GameState.PlayerOWins:
      return <div className="game-over">O wins</div>;
    case GameState.draw:
      return <div className="game-over">Draw!</div>;
    default:
      return <></>;
  }
}
