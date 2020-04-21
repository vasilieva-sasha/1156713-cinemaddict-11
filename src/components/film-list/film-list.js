import {createElement} from "../../tools/utils";
import {createFilmListTemplate} from "./components/film-list";

export default class FilmList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListTemplate(this._element);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
