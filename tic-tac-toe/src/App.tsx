import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

export type Marker = string | null;

export type Space = {
  row: number;
  col: number;
};

export type TurnData = {
  square: Space;
  player: string;
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const getCurrentPlayer = (state: Array<TurnData>) => {
  let currentPlayer = "X";
  if (state.length > 0 && state[0].player === "X") currentPlayer = "O";
  return currentPlayer;
};

const deriveWinner = (
  gameBoard: Array<Array<Marker>>,
  players: Record<string, string>,
): string | undefined => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

const deriveGameBoard = (gameTurns: Array<TurnData>): Array<Array<Marker>> => {
  const gameBoard: Array<Array<Marker>> = [
    ...INITIAL_GAME_BOARD.map((arr) => [...arr]),
  ];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

function App() {
  const [players, setPlayers] = useState<Record<string, string>>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<Array<TurnData>>([]);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (row: number, col: number) => {
    setGameTurns((prevTurns) => {
      return [
        { square: { row, col }, player: getCurrentPlayer(prevTurns) },
        ...prevTurns,
      ];
    });
  };

  const handlePlayerNameChange = (symbol: string, newName: string) => {
    setPlayers((prevState) => {
      return {
        ...prevState,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={getCurrentPlayer(gameTurns) === "X"}
            onChangeName={handlePlayerNameChange}
          ></Player>
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={getCurrentPlayer(gameTurns) === "O"}
            onChangeName={handlePlayerNameChange}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} rematchCallback={() => setGameTurns([])} />
        )}
        <GameBoard onSelectCallback={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
