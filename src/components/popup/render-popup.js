import {render} from "./../../tools/utils/render";
import {Position} from "./../../consts/consts";
import {onPopupClose} from "./close-popup";

const footer = document.querySelector(`.footer`);

const onCardClick = (popupElement) => {
  render(footer, popupElement, Position.AFTEREND);
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      onPopupClose(popupElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  popupElement.setPopupClose(() => {
    onPopupClose(popupElement);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  document.addEventListener(`keydown`, onEscKeyDown);
};

export {onCardClick};
