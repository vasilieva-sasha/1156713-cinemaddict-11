import {createPopupTemplate} from "./components/popup";
import AbstractSmartComponent from "../abstract-smart-component";

export default class Popup extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;


    this._popupClose = null;
    this._onControlsChange = null;
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  recoveryListeners() {
    this.setPopupClose(this._popupClose);
    this.setControlsChangeHandler(this._onControlsChange);
  }

  setPopupClose(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._isEmoji = false;

    this._popupClose = handler;
  }

  setControlsChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`click`, (evt) => {
        const controlType = evt.target.dataset.controlType;
        handler(controlType);
      });

    this._onControlsChange = handler;
  }

}
