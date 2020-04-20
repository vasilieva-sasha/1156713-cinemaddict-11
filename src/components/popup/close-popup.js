const closePopup = (element) => {
  const popup = element.getElement().querySelector(`.film-details`);
  const closeButton = popup.querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, () => {
    onCloseButtonClick(popup);
  });
};

const onCloseButtonClick = (popup) => {
  popup.remove();
};

export {closePopup};
