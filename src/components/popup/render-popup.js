import {render} from "./../../tools/utils/render";
import {Position, Class} from "./../../consts/consts";
import {onPopupClose} from "./close-popup";

const onCardClick = (popupElement) => {
  render(Class.FOOTER, popupElement, Position.AFTEREND);
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      onPopupClose(popupElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  popupElement.setCloseHandler(() => {
    onPopupClose(popupElement);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  document.addEventListener(`keydown`, onEscKeyDown);
};

export {onCardClick};
