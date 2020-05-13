import {createSiteNavigationTemplate} from "./components/navigation";
import AbstractComponent from "../abstract-component";

export default class Navigation extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createSiteNavigationTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = evt.target.dataset.filterType;

      handler(filterName);
    });
  }
}
