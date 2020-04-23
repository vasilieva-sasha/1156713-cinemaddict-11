import {createPopupTemplate} from "./components/popup";
import AbstractComponent from "../abstract-component";

export default class Popup extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }
}
