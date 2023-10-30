import { useState, useEffect } from "react";
import "./App.css";
// Importamos las imágenes
import Bat from "./assets/Images/Bat.png";
import Bones from "./assets/Images/Bones.png";
import Cauldron from "./assets/Images/Cauldron.png";
import Dracula from "./assets/Images/Dracula.png";
import Eye from "./assets/Images/Eye.png";
import Ghost from "./assets/Images/Ghost.png";
import Pumpkin from "./assets/Images/Pumpkin.png";
import Skull from "./assets/Images/Skull.png";
// Importamos los componentes
import Card from "./components/Card";
// Importamos las librerias
import Confetti from "react-confetti";

function App() {
  const arrayImages = [
    {
      num: 1,
      img: Bat,
      isMatch: false,
    },
    {
      num: 2,
      img: Bones,
      isMatch: false,
    },
    {
      num: 3,
      img: Cauldron,
      isMatch: false,
    },
    {
      num: 4,
      img: Dracula,
      isMatch: false,
    },
    {
      num: 5,
      img: Eye,
      isMatch: false,
    },
    {
      num: 6,
      img: Ghost,
      isMatch: false,
    },
    {
      num: 7,
      img: Pumpkin,
      isMatch: false,
    },
    {
      num: 8,
      img: Skull,
      isMatch: false,
    },
  ];
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalTries, setFinalTries] = useState(0);

  // Función que duplica el array original y baraja las cartas
  const shuffleImages = () => {
    const shuffledArray = [...arrayImages, ...arrayImages]
      .map((item, index) => ({ ...item, id: index + 1 }))
      .sort(() => 0.5 - Math.random());
    setScore(0);
    setTries(0);
    setCards(shuffledArray);
  };

  useEffect(() => {
    shuffleImages();
  }, []);

  // Función para voltear solo 2 cartas y comprobar si son iguales
  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);

      checkMatch();
    }
  }, [selectedCards]);

  // Comprobar si las cartas son iguales
  const checkMatch = () => {
    if (selectedCards[0].num === selectedCards[1].num) {
      setScore((prev) => prev + 1);
      const updatedCards = cards.map((card) => {
        if (card.num === selectedCards[0].num) {
          return { ...card, isMatch: true };
        }
        return card;
      });
      setCards(updatedCards);
    } else {
      setTries((prev) => prev + 1);
    }
  };

  // Reiniciar el juego
  useEffect(() => {
    if (score === arrayImages.length) {
      setFinalTries(tries);
      shuffleImages();
      setGameOver(true);
    }
  }, [score]);

  const restartGame = () => {
    setGameOver(false);
  };

  return (
    <>
      <h1 className="page-title">Memory Card Halloween</h1>
      {gameOver && (
        <div onClick={restartGame} className="overlay-text visible">
          <Confetti />
          <div className="overlay-text-big">GAME OVER</div>
          <div className="tries">In {finalTries} tries </div>
          <div className="overlay-text-small">Play Again</div>
        </div>
      )}

      <div className="game-container">
        <div className="game-info-container">
          <div className="game-info">Score: {score}</div>
          <div className="game-info">Tries: {tries}</div>
        </div>
        {cards.map((card) => (
          <Card
            className="card"
            key={card.id}
            card={card}
            setSelectedCards={setSelectedCards}
            selectedCards={selectedCards}
          />
        ))}
      </div>
    </>
  );
}

export default App;
