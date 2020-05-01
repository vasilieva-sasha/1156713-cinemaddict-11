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
    this._showingFilmsCount = SHOW_CARD_AMOUNT;
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

    renderCards(this._films.slice(0, this._showingFilmsCount), filmListContainer);

    this.renderButtonShow();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._showingFilmsCount = SHOW_CARD_AMOUNT;
      const sortedFilms = getSortedFilms[sortType](this._films, 0, this._showingFilmsCount);

      filmListContainer.innerHTML = ``;

      renderCards(sortedFilms, filmListContainer);
      this.renderButtonShow();
    });
  }

  renderExtraFilmLists(container) {
    render(container, this._topRatedComponent, Position.BEFOREEND);
    render(container, this._mostComentedComponent, Position.BEFOREEND);

    const topRatedContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
    const mostComentedContainer = this._mostComentedComponent.getElement().querySelector(`.films-list__container`);


    renderCards(topRatedList.slice(0, SHOW_EXTRA_CARD_AMOUNT), topRatedContainer);
    renderCards(mostComentedList.slice(0, SHOW_EXTRA_CARD_AMOUNT), mostComentedContainer);
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
    renderCards(sortedFilms, filmListContainer);

    if (this._showingFilmsCount >= this._films.length) {
      remove(this._buttonShowComponent);
    }
  }
}
