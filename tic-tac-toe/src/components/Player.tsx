import { useState } from "react";

export type OnChangeNameCallback = (symbol: string, newName: string) => void;

export type PlayerProps = {
  initialName: string;
  symbol: string;
  onChangeName: OnChangeNameCallback;
  isActive?: boolean;
};

export default function Player({
  initialName,
  symbol,
  onChangeName,
  isActive = false,
}: PlayerProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(initialName);

  const handleClick = () => {
    setIsEditing((wasEditing) => !wasEditing);
    if (isEditing) {
      onChangeName(symbol, name);
    }
  };

  let playerName = <span className="player-name">{name}</span>;

  if (isEditing) {
    playerName = (
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
