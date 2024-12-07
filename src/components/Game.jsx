import { useEffect, useState } from "react";
import "../styles/Game.css";

function Header({ scoreboard }) {
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

function Game() {
  const [catPics, setCatPics] = useState([]);
  const [scoreboard, setScoreboard] = useState({ score: 0, best: 0 });

  const numOfCards = 3; // strict mode off : 6
  const catCards = catPics.map((url, index) => {
    return (
      <button
        type="button"
        key={index}
        style={{ backgroundImage: `url(${url})` }}
      ></button>
    );
  });

  useEffect(() => {
    (async function getCatPics() {
      for (let i = 0; i < numOfCards; i++) {
        const endpoint =
          "https://cataas.com/cat?type=square&position=center&width=800&height=800";
        const response = await fetch(endpoint);

        if (response.ok) {
          const imgFile = await response.blob();
          const imgUrl = URL.createObjectURL(imgFile);

          setCatPics((catPics) => [...catPics, imgUrl]);
        }
      }
    })();
  }, []);

  if (catPics.length !== 6) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      <Header scoreboard={scoreboard} />
      <main>{catCards}</main>
    </>
  );
}

export default Game;
