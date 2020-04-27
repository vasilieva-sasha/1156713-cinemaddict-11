import {createCardTemplate} from "./components/film-card";
import AbstractComponent from "../abstract-component";

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }
}
