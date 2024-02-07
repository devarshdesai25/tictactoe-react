import React from "react";
import GameState from "./GameState";

export default function Reset({ gameState, onReset }) {
  if (gameState === GameState.inProgress) return <></>;
  return (
    <button className="reset-btn" onClick={onReset}>
      Reset
    </button>
  );
}
