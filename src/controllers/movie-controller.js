import {Position, Class} from "../consts/consts";
import {render, remove, replace} from "../tools/utils/render";
import Popup from "../components/popup/popup";
import FilmCard from "../components/film-card/film-card";
import Movie from "../models/movie";

const Mode = {
  DEFAULT: `default`,
  OPEN: `open`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
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
    this._popupComponent = new Popup(this._card, this._api, this._onDataChange, this);

    if (oldFilmCardComponent && oldPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, this._filmCardComponent, Position.BEFOREEND);
    }

    this._filmCardComponent.setClickHandler(() => {
      this._onCardClick();
    });

    this._popupComponent.getComments();

    this._onPopupClose = this._onPopupClose.bind(this);
    this._popupComponent.setPopupClose(this._onPopupClose);

    this._popupComponent.setControlsChangeHandler((controlType) => {
      const newFilm = Movie.clone(this._card);
      newFilm[controlType] = !newFilm[controlType];
      newFilm.watchDate = newFilm.inHistory ? new Date() : null;
      this._onDataChange(this, this._card, newFilm);
      this._mode = Mode.OPEN;
    });

    this._setControlsListeners();
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

  _setControlsListeners() {
    this._filmCardComponent.setControlsChangeHandler((controlType) => {
      const newFilm = Movie.clone(this._card);
      newFilm[controlType] = !newFilm[controlType];
      newFilm.watchDate = newFilm.inHistory ? new Date() : null;
      this._onDataChange(this, this._card, newFilm);

      this._mode = Mode.DEFAULT;
    });
  }

  _onCardClick() {
    this._onViewChange();
    this._mode = Mode.OPEN;

    render(Class.FOOTER, this._popupComponent, Position.AFTEREND);

    if (!this._popupComponent.getElement().querySelector(`.film-details__comments-wrap`)) {
      this._popupComponent.getComments();
    }
    this._popupComponent.recoveryListeners();

    document.addEventListener(`keydown`, this._onEscKeyDown);
    document.addEventListener(`keyup`, this._onCtrlEnterEvent);
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

  _onCtrlEnterEvent(evt) {
    const enterKey = evt.key === `Enter`;

    if (evt.ctrlKey && enterKey) {
      this._popupComponent.addComment();
    }
  }

}
