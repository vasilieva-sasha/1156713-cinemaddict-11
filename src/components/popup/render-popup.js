import {createPopupTemplate} from "./popup.js";
import {render} from "./../../tools/utils.js";
import {Position} from "./../../tools/consts.js";

const footer = document.querySelector(`.footer`);

export const onCardClick = (card) => {
  render(footer, createPopupTemplate(card), Position.AFTEREND);
  const popup = document.querySelector(`.film-details`);
  const closeButton = popup.querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, () => {
    popup.remove();
  });
};

