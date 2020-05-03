import {createCardTemplate} from "./components/film-card";
import AbstractSmartComponent from "../abstract-smart-component";

export default class FilmCard extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._element = null;

    this._setControlsChangeHandler = null;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  recoveryListeners() {
    this.setControlsChangeHandler(this._setControlsChangeHandler);
  }

  rerender() {
    super.rerender();
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setControlsChangeHandler(handler) {
    this.getElement().querySelector(`.film-card__controls`)
      .addEventListener(`click`, (evt) => {
        this._onControlChange(evt);
        const controlType = evt.target.dataset.controlType;
        handler(controlType);
      });
    this._setControlsChangeHandler = handler;
  }

  _onControlChange(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `BUTTON`) {
      return;
    }

    // this._card[controlType] = !this._card[controlType];
    this.rerender();
  }
}
