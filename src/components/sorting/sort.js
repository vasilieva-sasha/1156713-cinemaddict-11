import AbstractSmartComponent from "../abstract-smart-component";
import {createSortingTemplate} from "./components/sort";
import {SortType} from "../../consts/consts";

export default class Sort extends AbstractSmartComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;

    this._onSortTypeChange = null;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  rerender() {
    super.rerender();
    this._currentSortType = SortType.DEFAULT;
  }

  hide() {
    super.hide();
  }

  show() {
    super.show();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);

      evt.target.classList.add(`sort__button--active`);

      this._currentSortType = sortType;

      handler(this._currentSortType);
      this._onSortTypeChange = handler;
    });
  }
}
