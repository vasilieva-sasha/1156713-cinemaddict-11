import {onCardClick} from "./render-popup";

const showPopup = (element, popupElement) => {
  element.addEventListener(`click`, () => {
    onCardClick(popupElement);
  });
};

export {showPopup};
