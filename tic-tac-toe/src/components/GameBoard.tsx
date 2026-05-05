import type { Marker } from "../App";

export type SelectCallback = (row: number, col: number) => void;

export type GameBoardProps = {
  onSelectCallback: SelectCallback;
  board: Array<Array<Marker>>;
};

export default function GameBoard({ onSelectCallback, board }: GameBoardProps) {
  
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectCallback(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
