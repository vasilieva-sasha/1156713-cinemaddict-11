import {createButtonShowTemplate} from "./components/button-show";
import {createElement} from "../../tools/utils";

export default class ButtonShow {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonShowTemplate();
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
