import {createElement} from "../../tools/utils";
import {createExtraFilmsContainer} from "./components/extra-film-lists";

export default class FilmListExtra {
  constructor(heading) {
    this._element = null;
    this._heading = heading;
  }

  getTemplate() {
    return createExtraFilmsContainer(this._heading);
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
