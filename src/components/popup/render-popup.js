import {createPopupTemplate} from "./popup";
import {render} from "./../../tools/utils";
import {Position} from "./../../consts/consts";
import {closePopup} from "./close-popup";

const footer = document.querySelector(`.footer`);

const onCardClick = (card) => {
  render(footer, createPopupTemplate(card), Position.AFTEREND);
  closePopup();
};

export {onCardClick};
