import { useEffect, useState } from "react";
import "../styles/Game.css";
import Card from "./Card";

function Header({ scoreboard }) {
  const { score, best } = scoreboard;

  return (
    <header>
      <h1>Memory Card 🐱</h1>

      <div className="scoreboard">
        <span className="score">Score: {score}</span>
        <span className="best">Best: {best}</span>
      </div>
    </header>
  );
}

function shufflePics(pics) {
  const picsCopy = [...pics];

  for (let i = picsCopy.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = picsCopy[i];

    picsCopy[i] = picsCopy[randomIndex];
    picsCopy[randomIndex] = temp;
  }

  return picsCopy;
}

function resetPicClicks(pics) {
  return pics.map((pic) => ({ ...pic, clicked: false }));
}

function Game() {
  const [catPics, setCatPics] = useState([]);
  const [scoreboard, setScoreboard] = useState({
    score: 0,
    best: localStorage.getItem("best-score") || 0,
  });

  const { score, best } = scoreboard;
  const numOfCards = 3; // strict mode off : 6

  function checkCard(cardIndex) {
    const selectedCard = catPics[cardIndex];

    if (selectedCard.clicked === false) {
      const catPicsCopy = [...catPics];
      const updatedCatPic = { ...selectedCard, clicked: true };

      catPicsCopy[cardIndex] = updatedCatPic;

      const shuffledPics = shufflePics(catPicsCopy);

      setScoreboard({ ...scoreboard, score: score + 1 });
      setCatPics(shuffledPics);
    } else {
      const catPicsCopy = [...catPics];

      const reset = resetPicClicks(catPicsCopy);
      const shuffledReset = shufflePics(reset);

      setScoreboard({ ...scoreboard, score: 0 });
      setCatPics(shuffledReset);
    }
  }

  useEffect(() => {
    (async function getCatPics() {
      for (let i = 0; i < numOfCards; i++) {
        const endpoint =
          "https://cataas.com/cat?type=square&position=center&width=800&height=800";
        const response = await fetch(endpoint);

        if (response.ok) {
          const imgFile = await response.blob();
          const imgUrl = URL.createObjectURL(imgFile);

          setCatPics((catPics) => [
            ...catPics,
            { clicked: false, url: imgUrl },
          ]);
        }
      }
    })();
  }, []);

  const catCards = catPics.map((pic, index) => {
    return (
      <Card
        key={index}
        imgUrl={pic.url}
        clickHandler={() => checkCard(index)}
      />
    );
  });

  if (score > best) {
    setScoreboard({ ...scoreboard, best: score });

    localStorage.setItem("best-score", score);
  }

  if (catPics.length !== 6) {
    return (
      <>
        <p className="loading">Loading...</p>
        <p className="refresh">
          If the game is taking too long to load, please refresh the page.
        </p>
      </>
    );
  }

  return (
    <>
      <Header scoreboard={scoreboard} />
      <main>{catCards}</main>
    </>
  );
}

export default Game;
