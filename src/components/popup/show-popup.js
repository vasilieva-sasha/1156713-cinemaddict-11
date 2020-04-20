import {onCardClick} from "./render-popup";
import {filmCardsList} from "./../../tools/render-cards";

const showPopup = (element, popupElement) => {
  element.addEventListener(`click`, () => {
    onCardClick(popupElement);
  });
};

export {showPopup};
