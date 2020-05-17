import {createCardTemplate} from "./components/film-card";
import AbstractSmartComponent from "../abstract-smart-component";

export default class FilmCard extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._element = null;

    this._onControlsChange = null;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  recoveryListeners() {
    this.setControlsChangeHandler(this._onControlsChange);
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
    this._onControlsChange = handler;
  }

  _onControlChange(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `BUTTON`) {
      return;
    }

    this.rerender();
  }
}
