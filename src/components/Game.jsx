import { useState } from "react";
import "../styles/Game.css";

function Game() {
  const [scoreboard, setScoreboard] = useState({ score: 0, best: 0 });

  return (
    <header>
      <h1>Memory Card 🐱</h1>
      <div className="scoreboard">
        <span className="score">Score: {scoreboard.score}</span>
        <span className="best">Best: {scoreboard.best}</span>
      </div>
    </header>
  );
}

export default Game;
