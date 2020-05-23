import {Position} from "../consts/consts";
import {render, remove, replace} from "../tools/utils/render";
import Popup from "../components/popup/popup";
import FilmCard from "../components/film-card/film-card";
import API from "../api/api";
import Comments from "../components/popup/comments";

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
    this._commentsListComponent = null;

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
      this._onCardClick();
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

    this._popupComponent.setPopupClose(this._onPopupClose, (controlType) => {
      this._onDataChange(this, card, Object.assign({}, card, {
        [controlType]: !card[controlType],
      }));
    });

    this._popupComponent.setControlsChangeHandler();
  }

  _getComments() {
    const AUTHORIZATION = `Basic ghfghdkjgm56vjckxg`;
    const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
    const api = new API(END_POINT, AUTHORIZATION);
    api.getComments(this._card.id)
      .then((data) => {
        this._commentsListComponent = new Comments(data);
        this._popupComponent.getElement().querySelector(`.form-details__bottom-container`).append(this._commentsListComponent.getElement());
        this._commentsListComponent.setEmojiChangeHandler();

        this._commentsListComponent.setOnCommentDelete(() => {
          this._onDataChange(this, this._card, Object.assign({}, this._card, {
            comments: this._commentsListComponent.newComments,
          }));
        });
      });
  }

  _onCardClick() {
    this._onViewChange();
    this._mode = Mode.OPEN;

    const footer = document.querySelector(`.footer`);
    render(footer, this._popupComponent, Position.AFTEREND);
    this._getComments();

    document.addEventListener(`keydown`, this._onEscKeyDown);
    document.addEventListener(`keyup`, this._onCtrlEnterEvent);
  }

  _onPopupClose() {
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  // функция удал комм

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
      this._commentsListComponent.addComment();
    }

  }
}
