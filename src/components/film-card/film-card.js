import {createFilmCardTemplate} from "./components/film-card";
import AbstractSmartComponent from "../abstract-smart-component";

export default class FilmCard extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._element = null;

    this._controlsChangeHandler = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  recoveryListeners() {
    this.setControlsChangeHandler(this._controlsChangeHandler);
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
        this._controlChangeHandler(evt);
        const controlType = evt.target.dataset.controlType;
        this.rerender();
        handler(controlType);
      });

    this._controlsChangeHandler = handler;
  }

  _controlChangeHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `BUTTON`) {
      return;
    }

    this.rerender();
  }
}
