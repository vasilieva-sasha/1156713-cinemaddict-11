import FilmList from "../components/film-list/film-list";
import ButtonShow from "../components/button-show/button-show";
import FilmListExtra from "../components/film-list/film-list-extra";
import NoFilmMessage from "../components/messages/no-films";
import {render, remove} from "../tools/utils/render";
import {CARD_AMOUNT, Position, SHOW_CARD_AMOUNT, SHOW_EXTRA_CARD_AMOUNT} from "../consts/consts";
import {renderCards} from "../tools/render-cards";
import Sort from "../components/sorting/sort";
import {getSortedFilms} from "../components/sorting/components/sort";

const topRatedHeading = `Top rated`;
const mostCommentedHeading = `Most commented`;

export default class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._sortComponent = new Sort();
    this._filmListComponent = new FilmList();
    this._buttonShowComponent = new ButtonShow();
    this._topRatedComponent = new FilmListExtra(topRatedHeading);
    this._mostComentedComponent = new FilmListExtra(mostCommentedHeading);
    this._noFilmComponent = new NoFilmMessage();

    this._filmListContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);

    this._showedFilmControllers = [];
    this._showedExtraFilmControllers = [];
    this._showingFilmsCount = SHOW_CARD_AMOUNT;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);

    this._onButtonShowClick = this._onButtonShowClick.bind(this);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  renderButtonShow() {

    remove(this._buttonShowComponent);

    if (this._filmsModel.getAllFilms().length > this._showingFilmsCount) {
      render(this._filmListComponent.getElement(), this._buttonShowComponent, Position.BEFOREEND);
      this._buttonShowComponent.setButtonClick(() => {
        this._onButtonShowClick();
      });
    }
  }

  renderFilmList(container, films) {
    render(container, this._filmListComponent, Position.BEFOREEND);

    this._renderCards(films.slice(0, this._showingFilmsCount), this._filmListContainer);

    this.renderButtonShow();

  }

  renderExtraFilmLists(container, films) {
    render(container, this._topRatedComponent, Position.BEFOREEND);
    render(container, this._mostComentedComponent, Position.BEFOREEND);

    const topRatedList = [...films].slice().sort((first, second) => {
      return second.rate - first.rate;
    });

    const mostComentedList = [...films].slice().sort((first, second) => {
      return second.comments.length - first.comments.length;
    });

    const topRatedContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
    const mostComentedContainer = this._mostComentedComponent.getElement().querySelector(`.films-list__container`);

    this._renderCards(topRatedList.slice(0, SHOW_EXTRA_CARD_AMOUNT), topRatedContainer);


    this._renderCards(mostComentedList.slice(0, SHOW_EXTRA_CARD_AMOUNT), mostComentedContainer);

  }

  render() {
    const container = this._container.getElement();
    const films = this._filmsModel.getAllFilms();

    render(container, this._sortComponent, Position.BEFOREBEGIN);

    if (CARD_AMOUNT === 0) {
      render(container, this._noFilmComponent, Position.AFTERBEGIN);
      return;
    }

    render(this._filmListComponent.getElement(), this._buttonShowComponent, Position.BEFOREEND);
    this.renderFilmList(container, films);
    this.renderExtraFilmLists(container, films);
  }

  _removeCards() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _renderCards(films, container) {
    const newFilms = renderCards(films, container, this._onDataChange, this._onViewChange);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
  }

  _updateCards(count) {
    this._removeCards();
    this._renderCards(this._filmsModel.getFilms().slice(0, count), this._filmListContainer);
    this.renderExtraFilmLists(this._container.getElement(), this._filmsModel.getAllFilms());
    this.renderButtonShow();
  }

  _onButtonShowClick() {
    let prevCardsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + SHOW_CARD_AMOUNT;

    const sortedFilms = getSortedFilms[this._sortComponent.getSortType()](this._filmsModel.getFilms(), prevCardsCount, this._showingFilmsCount);

    this._renderCards(sortedFilms, this._filmListContainer);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      remove(this._buttonShowComponent);
    }
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOW_CARD_AMOUNT;

    const sortedFilms = getSortedFilms[sortType](this._filmsModel.getFilms(), 0, this._showingFilmsCount);

    this._removeCards();
    this._renderCards(sortedFilms, this._filmListContainer);

    this.renderButtonShow();
    this.renderExtraFilmLists(this._container.getElement(), this._filmsModel.getAllFilms());
  }

  _onFilterChange() {
    this._updateCards(SHOW_CARD_AMOUNT);
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }
}
