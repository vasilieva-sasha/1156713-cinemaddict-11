import FilmList from "../components/film-list/film-list";
import ButtonShow from "../components/button-show/button-show";
import FilmListExtra from "../components/film-list/film-list-extra";
import NoFilmMessage from "../components/messages/no-films";
import {render, remove} from "../tools/utils/render";
import {CARD_AMOUNT, Position, SHOW_CARD_AMOUNT, SHOW_EXTRA_CARD_AMOUNT} from "../consts/consts";
import {renderCards} from "../tools/render-cards";
import {topRatedList, mostComentedList} from "../components/film-list/components/extra-film-lists";
import Sort from "../components/sorting/sort";
import {getSortedFilms} from "../components/sorting/components/sort";

const topRatedHeading = `Top rated`;
const mostCommentedHeading = `Most commented`;

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new Sort();
    this._filmListComponent = new FilmList();
    this._buttonShowComponent = new ButtonShow();
    this._topRatedComponent = new FilmListExtra(topRatedHeading);
    this._mostComentedComponent = new FilmListExtra(mostCommentedHeading);
    this._noFilmComponent = new NoFilmMessage();

    this._films = [];
    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOW_CARD_AMOUNT;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
  }

  renderButtonShow() {

    remove(this._buttonShowComponent);

    if (this._films.length > SHOW_CARD_AMOUNT) {
      render(this._filmListComponent.getElement(), this._buttonShowComponent, Position.BEFOREEND);
      this._buttonShowComponent.setButtonClick(() => {
        this._onButtonShowClick();
      });
    }
  }

  renderFilmList(container) {

    render(container, this._filmListComponent, Position.BEFOREEND);

    const filmListContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);

    const newFilms = renderCards(this._films.slice(0, this._showingFilmsCount), filmListContainer, this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this.renderButtonShow();

  }

  renderExtraFilmLists(container) {
    render(container, this._topRatedComponent, Position.BEFOREEND);
    render(container, this._mostComentedComponent, Position.BEFOREEND);

    const topRatedContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
    const mostComentedContainer = this._mostComentedComponent.getElement().querySelector(`.films-list__container`);

    const newTopRatedFilms = renderCards(topRatedList.slice(0, SHOW_EXTRA_CARD_AMOUNT), topRatedContainer, this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newTopRatedFilms);

    const newMostRecomendedFilms = renderCards(mostComentedList.slice(0, SHOW_EXTRA_CARD_AMOUNT), mostComentedContainer);
    this._showedFilmControllers = this._showedFilmControllers.concat(newMostRecomendedFilms);
  }

  render(films) {
    this._films = films;

    const container = this._container.getElement();

    render(container, this._sortComponent, Position.BEFOREBEGIN);

    if (CARD_AMOUNT === 0) {
      render(container, this._noFilmComponent, Position.AFTERBEGIN);
      return;
    }

    render(this._filmListComponent.getElement(), this._buttonShowComponent, Position.BEFOREEND);
    this.renderFilmList(container, this._films);
    this.renderExtraFilmLists(container);
  }

  _onButtonShowClick() {
    let prevCardsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + SHOW_CARD_AMOUNT;

    const sortedFilms = getSortedFilms[this._sortComponent.getSortType()](this._films, prevCardsCount, this._showingFilmsCount);

    const filmListContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);
    const newFilms = renderCards(sortedFilms, filmListContainer, this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    if (this._showingFilmsCount >= this._films.length) {
      remove(this._buttonShowComponent);
    }
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOW_CARD_AMOUNT;

    const sortedFilms = getSortedFilms[sortType](this._films, 0, this._showingFilmsCount);
    const filmListContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);

    filmListContainer.innerHTML = ``;

    const newFilms = renderCards(sortedFilms, filmListContainer, this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this.renderButtonShow();
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }
}
