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

      if (evt.target.classList.contains(`main-navigation__item`)) {
        const filterName = evt.target.dataset.filterType;
        this.getElement().querySelector(`.main-navigation__item--active`)
          .classList.remove(`main-navigation__item--active`);
        evt.target.classList.add(`main-navigation__item--active`);

        handler(filterName);
      }
    });
  }

  setStatsSelectHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {

      if (evt.target.classList.contains(`main-navigation__additional`)) {
        this.getElement().querySelector(`.main-navigation__item--active`)
          .classList.remove(`main-navigation__item--active`);
        evt.target.classList.add(`main-navigation__item--active`);
        handler();
      }
    });
  }
}
