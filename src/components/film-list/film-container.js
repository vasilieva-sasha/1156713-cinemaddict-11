import {createMainContentTemplate} from "./components/films-container";
import {createElement} from "../../tools/utils";

export default class FilmContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainContentTemplate(this._element);
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
