import {onCardClick} from "./render-popup";
import {filmCardsList} from "./../../tools/render-cards";

const showPopup = (i, element) => {
  element.addEventListener(`click`, () => {
    onCardClick(filmCardsList[i], element);
  });
};

export {showPopup};
