import {Position, Class, Mode} from "../consts/consts";
import {render, remove, replace} from "../tools/utils/render";
import Popup from "../components/popup/popup";
import FilmCard from "../components/film-card/film-card";
import Movie from "../models/movie";


export default class MovieController {
  constructor(container, dataChangeHandler, viewChangeHandler, api, cardControlChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._api = api;
    this._cardControlChangeHandler = cardControlChangeHandler;
    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._commentsListComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  render(card) {
    this._card = card;

    const oldFilmCardComponent = this._filmCardComponent;
    const oldPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCard(this._card);
    this._popupComponent = new Popup(this._card, this._api, this._dataChangeHandler, this);

    if (oldFilmCardComponent && oldPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, this._filmCardComponent, Position.BEFOREEND);
    }

    this._filmCardComponent.setClickHandler(() => {
      this._cardClickHandler();
    });

    this._popupComponent.getComments();

    this._popupCloseHandler = this._popupCloseHandler.bind(this);
    this._popupComponent.setCloseHandler(this._popupCloseHandler);

    this._popupComponent.setControlsChangeHandler((controlType) => {
      this._mode = Mode.OPEN;
      const newFilm = Movie.clone(this._card);
      newFilm[controlType] = !newFilm[controlType];
      newFilm.watchDate = newFilm.inHistory ? new Date() : null;
      this._dataChangeHandler(this, this._card, newFilm, this._mode);
      this._popupComponent.getComments();
    });

    this._setControlsListeners();
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._popupCloseHandler();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _setControlsListeners() {
    this._filmCardComponent.setControlsChangeHandler((controlType) => {
      this._mode = Mode.DEFAULT;
      const newFilm = Movie.clone(this._card);
      newFilm[controlType] = !newFilm[controlType];
      newFilm.watchDate = newFilm.inHistory ? new Date() : null;
      this._dataChangeHandler(this, this._card, newFilm, this._mode);
    });
  }

  _cardClickHandler() {
    this._viewChangeHandler();
    this._mode = Mode.OPEN;

    render(Class.FOOTER, this._popupComponent, Position.AFTEREND);

    if (!this._popupComponent.getElement().querySelector(`.film-details__comments-wrap`)) {
      this._popupComponent.getComments();
    }
    this._popupComponent.recoveryListeners();

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _popupCloseHandler() {
    remove(this._popupComponent);

    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._popupCloseHandler();
    }
  }
}
