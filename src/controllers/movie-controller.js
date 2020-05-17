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
    this._onCtrlEnterEvent = this._onCtrlEnterEvent.bind(this);
  }

  render(card) {
    this._card = card;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCard(this._card);
    this._popupComponent = new Popup(this._card);

    if (oldFilmCardComponent && oldPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, this._filmCardComponent, Position.BEFOREEND);
    }

    this._filmCardComponent.setClickHandler(() => {
      this._onCardClick(this._card);
    });

    this._setPopupListeners(this._card);

    this._setControlsListeners(this._card);
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

  _setControlsListeners(card) {
    this._filmCardComponent.setControlsChangeHandler((controlType) => {
      this._onDataChange(this, card, Object.assign({}, card, {
        [controlType]: !card[controlType],
      }));
      this._mode = Mode.DEFAULT;
    });
  }

  _setPopupListeners(card) {
    this._onPopupClose = this._onPopupClose.bind(this);
    // this._addComment = this._addComment.bind(this);
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
    document.addEventListener(`keyup`, this._onCtrlEnterEvent);
  }

  _onPopupClose() {
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  // функция добавл комм


  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._onPopupClose();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onCtrlEnterEvent(evt) {
    const enterKey = evt.key === `Enter`;

    if (evt.ctrlKey && enterKey) {
      this._popupComponent.addComment(() => {
        this._onDataChange(this, this._card, Object.assign({}, this._card, {
          comments: this._popupComponent.newComments,
        }));
      });
    }

  }
}
