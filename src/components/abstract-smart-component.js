import AbstractComponent from "./abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }

  hide() {
    if (this._element) {
      this._element.classList.add(`visually-hidden`);
    }
  }

  show() {
    if (this._element) {
      this._element.classList.remove(`visually-hidden`);
    }
  }
}
