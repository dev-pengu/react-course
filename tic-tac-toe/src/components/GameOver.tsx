export type RematchCallback = () => void;

export type GameOverProps = {
  winner: string | undefined;
  rematchCallback: RematchCallback;
};

export default function GameOver({ winner, rematchCallback }: GameOverProps) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      <p>
        <button onClick={rematchCallback}>Rematch!</button>
      </p>
    </div>
  );
}
