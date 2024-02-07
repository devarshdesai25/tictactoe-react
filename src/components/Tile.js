import React from "react";

export default function Tile(props) {
  const { value, handleTileClick, index } = props;
  return (
    <div className="tile" onClick={() => handleTileClick(index)}>
      {value}
    </div>
  );
}
