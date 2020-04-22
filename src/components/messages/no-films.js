import {createNoFilmsMarkup} from "./components/no-data-message";
import {createElement} from "../../tools/utils";

export default class NoFilmMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmsMarkup();
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
