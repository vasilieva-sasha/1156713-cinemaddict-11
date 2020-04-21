const closePopup = (popupElement) => {
  const popup = popupElement.getElement();
  const closeButton = popup.querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, () => {
    onCloseButtonClick(popup);
  });
};

const onCloseButtonClick = (popup) => {
  popup.remove();
};

export {closePopup};
