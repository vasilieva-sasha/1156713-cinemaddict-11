import {render} from "./../../tools/utils";
import {Position} from "./../../consts/consts";
import {closePopup} from "./close-popup";

const footer = document.querySelector(`.footer`);

const onCardClick = (popupElement) => {
  render(footer, popupElement.getElement(), Position.AFTEREND);
  closePopup(popupElement);
};

export {onCardClick};
