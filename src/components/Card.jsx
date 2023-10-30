import { useEffect, useState } from "react";
import "../App.css";
// Importamos las imágenes
import Cobweb from "../assets/Images/Cobweb.png";
import CobwebGrey from "../assets/Images/CobwebGrey.png";
import Spider from "../assets/Images/Spider.png";

const Card = ({ card, setSelectedCards, selectedCards }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setSelectedCards([...selectedCards, card]);
  };

  useEffect(() => {
    if (
      selectedCards[0] === card ||
      selectedCards[1] === card ||
      card.isMatch
    ) {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }, [selectedCards]);

  return (
    <div className={isFlipped ? "card visible" : "card"} onClick={handleClick}>
      <div className="card-back card-face">
        <img className="cob-web cob-web-top-left" src={Cobweb} />
        <img className="cob-web cob-web-top-right" src={Cobweb} />
        <img className="cob-web cob-web-bottom-left" src={Cobweb} />
        <img className="cob-web cob-web-bottom-right" src={Cobweb} />
        <img className="spider" src={Spider}></img>
      </div>
      <div className="card-front card-face">
        <img className="cob-web cob-web-top-left" src={CobwebGrey} />
        <img className="cob-web cob-web-top-right" src={CobwebGrey} />
        <img className="cob-web cob-web-bottom-left" src={CobwebGrey} />
        <img className="cob-web cob-web-bottom-right" src={CobwebGrey} />
        <img
          className={card.isMatch ? "card-matched" : "card-value"}
          src={card.img}
          alt=""
        />
      </div>
    </div>
  );
};
export default Card;
