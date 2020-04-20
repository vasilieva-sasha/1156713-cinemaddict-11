import {createPopupTemplate} from "./components/popup";
import {createElement} from "../../tools/utils";

export default class Popup {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createPopupTemplate(this._card);
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
