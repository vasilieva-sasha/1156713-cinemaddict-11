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
}
