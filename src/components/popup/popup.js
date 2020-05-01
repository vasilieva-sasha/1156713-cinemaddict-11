import {createPopupTemplate} from "./components/popup";
import AbstractComponent from "../abstract-component";

export default class Popup extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  setPopupClose(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  setControlsChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName !== `LABEL`) {
          return;
        }

        const controlType = evt.target.dataset.controlType;
        this._card[controlType] = !this._card[controlType];

        handler();
      });
  }
}
