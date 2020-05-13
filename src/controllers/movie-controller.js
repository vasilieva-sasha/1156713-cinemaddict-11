import {Position} from "../consts/consts";
import {render, remove, replace} from "../tools/utils/render";
import Popup from "../components/popup/popup";
import FilmCard from "../components/film-card/film-card";

const Mode = {
  DEFAULT: `default`,
  OPEN: `open`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._popupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(card) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCard(card);
    this._popupComponent = new Popup(card);

    if (oldFilmCardComponent && oldPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, this._filmCardComponent, Position.BEFOREEND);
    }

    this._filmCardComponent.setClickHandler(() => {
      this._onCardClick(card);
    });

    this._setPopupListeners(card);


    this._filmCardComponent.setControlsChangeHandler((controlType) => {
      this._onDataChange(this, card, Object.assign({}, card, {
        [controlType]: !card[controlType],
      }));
      this._mode = Mode.DEFAULT;
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._onPopupClose();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _setPopupListeners(card) {
    this._onPopupClose = this._onPopupClose.bind(this);
    this._popupComponent.setPopupClose(this._onPopupClose);

    this._popupComponent.setControlsChangeHandler((controlType) => {
      this._onDataChange(this, card, Object.assign({}, card, {
        [controlType]: !card[controlType],
      }));
    });

    this._popupComponent.setEmojiChangeHandler();
  }

  _onCardClick(card) {
    this._onViewChange();
    this._mode = Mode.OPEN;

    const footer = document.querySelector(`.footer`);
    render(footer, this._popupComponent, Position.AFTEREND);

    this._setPopupListeners(card);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onPopupClose() {
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._onPopupClose();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
