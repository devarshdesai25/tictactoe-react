import React from "react";
import Tile from "./Tile";

export default function Board({ tiles, handleTileClick }) {
  const listItems = tiles.map((tile, index) => (
    <Tile
      key={index}
      value={tiles[index]}
      index={index}
      handleTileClick={handleTileClick}
    />
  ));
  return <div className="board">{listItems}</div>;
}
