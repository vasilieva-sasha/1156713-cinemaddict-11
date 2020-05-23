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
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

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

    if (this._filmsModel.getFilms().length > this._showingFilmsCount) {
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
    const topRatedList = [...films].slice().sort((first, second) => {
      return second.rate - first.rate;
    });

    const mostComentedList = [...films].slice().sort((first, second) => {
      return second.comments.length - first.comments.length;
    });

    if (topRatedList[0].rate > 0) {
      render(container, this._topRatedComponent, Position.BEFOREEND);
      const topRatedContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container`);

      this._renderExtraCards(topRatedList.slice(0, SHOW_EXTRA_CARD_AMOUNT), topRatedContainer);
    }

    if (mostComentedList[0].comments.length > 0) {
      render(container, this._mostComentedComponent, Position.BEFOREEND);
      const mostComentedContainer = this._mostComentedComponent.getElement().querySelector(`.films-list__container`);

      this._renderExtraCards(mostComentedList.slice(0, SHOW_EXTRA_CARD_AMOUNT), mostComentedContainer);
    }
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

    // this._showedExtraFilmControllers.forEach((filmController) => filmController.destroy());
    // this._showedExtraFilmControllers = [];
  }

  _renderCards(films, container) {
    const newFilms = renderCards(films, container, this._onDataChange, this._onViewChange);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
  }

  _renderExtraCards(films, container) {
    const newFilms = renderCards(films, container, this._onDataChange, this._onViewChange);

    this._showedExtraFilmControllers = this._showedExtraFilmControllers.concat(newFilms);
  }

  _updateCards(count) {
    this._removeCards();
    this._renderCards(this._filmsModel.getFilms().slice(0, count), this._filmListContainer);
    // this.renderExtraFilmLists(this._container.getElement(), this._filmsModel.getAllFilms());
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
    if (this._filmsModel.getFilms().length === 0) {
      this._removeCards();
      remove(this._buttonShowComponent);
      render(this._container.getElement(), this._noFilmComponent, Position.AFTERBEGIN);
      return;
    }
    remove(this._noFilmComponent);
    this._updateCards(SHOW_CARD_AMOUNT);

    this._sortComponent.rerender();

    this._onCardControlChange();
    // this._onPopupControlChange();
  }

  _onCardControlChange() {
    this._filmListComponent.getElement().querySelector(`.films-list__container`)
    .addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
        return;
      }
      this._updateCards(SHOW_CARD_AMOUNT);

      if (this._filmsModel.getFilms().length === 0) {
        this._removeCards();
        remove(this._buttonShowComponent);
        render(this._container.getElement(), this._noFilmComponent, Position.AFTERBEGIN);
        return;
      }
    });
  }


  _onDataChange(movieController, oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
        .then((filmModel) => {
          const isSuccess = this._filmsModel.updateFilm(oldData.id, filmModel);

          if (isSuccess) {
            movieController.render(filmModel);
            // this._updateCards(this._showingFilmsCount);
          }
        });
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((controller) => controller.setDefaultView());
    this._showedExtraFilmControllers.forEach((controller) => controller.setDefaultView());
  }
}
