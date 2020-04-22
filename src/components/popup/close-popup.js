import {onEscDown} from "../../tools/utils";

const closePopup = (popupElement) => {
  const popup = popupElement.getElement();
  const closeButton = popup.querySelector(`.film-details__close-btn`);
  document.addEventListener(`keydown`, (evt) => {
    onEscDown(evt, () => {
      onPopupClose(popup);
    });
  });

  closeButton.addEventListener(`click`, () => {
    onPopupClose(popup);
  });
};

const onPopupClose = (popup) => {
  popup.remove();
  document.removeEventListener(`keydown`, onEscDown);
};

export {closePopup};
