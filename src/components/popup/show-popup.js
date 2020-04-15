import {onCardClick} from "./render-popup";
import {filmCardsList} from "./../../tools/render-cards";

const showPopup = (card, i) => {
  card.addEventListener(`click`, () => {
    onCardClick(filmCardsList[i]);
  });
};

export {showPopup};
