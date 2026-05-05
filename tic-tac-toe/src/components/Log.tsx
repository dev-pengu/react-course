import type { TurnData } from "../App";

export type LogProps = {
  turns: Array<TurnData>;
};

export default function Log({ turns }: LogProps) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
