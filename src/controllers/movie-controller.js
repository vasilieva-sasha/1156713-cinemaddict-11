import {Position} from "../consts/consts";
import {render, remove} from "../tools/utils/render";
import Popup from "../components/popup/popup";
import FilmCard from "../components/film-card/film-card";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmCardComponent = null;
    this._popupComponen = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(card) {
    this._filmCardComponent = new FilmCard(card);
    this._popupComponent = new Popup(card);
    render(this._container, this._filmCardComponent, Position.BEFOREEND);

    this._filmCardComponent.setClickHandler(() => {
      this._onCardClick(this._popupComponent);
    });

    this._filmCardComponent.setControlsChangeHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        controlType: !card.controlType,
      }));
    });

  }

  _onCardClick() {
    const footer = document.querySelector(`.footer`);
    render(footer, this._popupComponent, Position.AFTEREND);

    this._popupComponent.setPopupClose(() => {
      this._onPopupClose();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onPopupClose() {
    remove(this._popupComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._onPopupClose();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
