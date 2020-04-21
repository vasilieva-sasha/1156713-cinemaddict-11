import {createSiteNavigationTemplate} from "./components/navigation";
import {createElement} from "../../tools/utils";

export default class Navigation {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteNavigationTemplate();
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
