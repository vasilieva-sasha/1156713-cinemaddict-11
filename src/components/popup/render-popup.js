import {render} from "./../../tools/utils/render";
import {Position} from "./../../consts/consts";
import {onPopupClose} from "./close-popup";
import {onEscDown} from "../../tools/utils/utils";

const footer = document.querySelector(`.footer`);

const onCardClick = (popupElement) => {
  render(footer, popupElement, Position.AFTEREND);
  popupElement.setPopupClose(() => {
    onPopupClose(popupElement);
  });
  document.addEventListener(`keydown`, (evt) => {
    onEscDown(evt, () => {
      onPopupClose(popupElement);
    });
  });
};

export {onCardClick};
