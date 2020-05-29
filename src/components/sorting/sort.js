import AbstractSmartComponent from "../abstract-smart-component";
import {createSortingTemplate} from "./components/sort";
import {SortType} from "../../consts/consts";

export default class Sort extends AbstractSmartComponent {
  constructor() {
    super();
    this._currentType = SortType.DEFAULT;

    this._typeChangeHandler = null;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  recoveryListeners() {
    this.setTypeChangeHandler(this._typeChangeHandler);
  }

  rerender() {
    super.rerender();
    this.currentType = SortType.DEFAULT;
  }

  hide() {
    super.hide();
  }

  show() {
    super.show();
  }

  getType() {
    return this._currentType;
  }

  setType(value) {
    this._currentType = value;
  }

  setTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentType === sortType) {
        return;
      }

      this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);

      evt.target.classList.add(`sort__button--active`);

      this._currentType = sortType;

      handler(this._currentType);
    });
    this._typeChangeHandler = handler;
  }
}
