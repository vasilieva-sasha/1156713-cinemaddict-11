import FilmList from "../components/film-list/film-list";
import ButtonShow from "../components/button-show/button-show";
import FilmListExtra from "../components/film-list/film-list-extra";
import NoFilmMessage from "../components/messages/no-films-message";
import {render, remove} from "../tools/utils/render";
import {Position, SHOW_CARD_AMOUNT, SHOW_EXTRA_CARD_AMOUNT, Class, Mode, SortType} from "../consts/consts";
import {renderCards} from "../tools/render-cards";
import Sort from "../components/sorting/sort";
import {getSortedFilms} from "../components/sorting/components/sort";
import Statistic from "../components/statistic/statistic";
import HeaderProfile from "../components/header/header-pofile";

const topRatedHeading = `Top rated`;
const mostCommentedHeading = `Most commented`;

export default class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._headerProfile = new HeaderProfile(this._filmsModel);
    this._sortComponent = new Sort();
    this._filmListComponent = new FilmList();
    this._buttonShowComponent = new ButtonShow();
    this._topRatedComponent = new FilmListExtra(topRatedHeading);
    this._mostComentedComponent = new FilmListExtra(mostCommentedHeading);
    this._noFilmComponent = new NoFilmMessage();
    this._statisticsComponent = new Statistic(this._filmsModel);

    this._filmListContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);

    this._showedFilmControllers = [];
    this._showedExtraFilmControllers = [];
    this._showingFilmsCount = SHOW_CARD_AMOUNT;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent.setTypeChangeHandler(this._sortTypeChangeHandler);

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._filmsModel.setFilterChangeHandler(this._filterChangeHandler);

    this._buttonShowClickHandler = this._buttonShowClickHandler.bind(this);
    this.showMainPage.bind(this);

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }

  renderButtonShow() {

    remove(this._buttonShowComponent);

    if (this._filmsModel.getFilms().length > this._showingFilmsCount) {
      render(this._filmListComponent.getElement(), this._buttonShowComponent, Position.BEFOREEND);
      this._buttonShowComponent.setButtonClick(() => {
        this._buttonShowClickHandler();
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

    this._renderProfileHeader();

    render(container, this._sortComponent, Position.BEFOREBEGIN);

    if (this._filmsModel.getAllFilms().length === 0) {
      render(container, this._noFilmComponent, Position.AFTERBEGIN);
      return;
    }

    render(this._filmListComponent.getElement(), this._buttonShowComponent, Position.BEFOREEND);
    this.renderFilmList(container, films);
    this.renderExtraFilmLists(container, films);

    render(container, this._statisticsComponent, Position.BEFOREEND);

    this._statisticsComponent.hide();

    this._statisticsComponent.render();

  }

  hide() {
    this._sortComponent.hide();
    this._filmListComponent.hide();
    this._topRatedComponent.hide();
    this._mostComentedComponent.hide();
    this._buttonShowComponent.hide();
  }

  show() {
    this._sortComponent.show();
    this._filmListComponent.show();
    this._topRatedComponent.show();
    this._mostComentedComponent.show();
    this._buttonShowComponent.show();
  }

  showStatistics() {
    this.hide();
    this._statisticsComponent.rerender();
    this._statisticsComponent.show();
  }

  showMainPage() {
    this._statisticsComponent.hide();

    this.show();
  }

  _removeCards() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];

    this._showedExtraFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedExtraFilmControllers = [];
  }

  _renderProfileHeader() {
    render(Class.HEADER, this._headerProfile, Position.BEFOREEND);
  }

  _rerenderProfileHeader() {
    remove(this._headerProfile);
    render(Class.HEADER, this._headerProfile, Position.BEFOREEND);
  }

  _renderCards(films, container) {
    const newFilms = renderCards(films, container, this._dataChangeHandler, this._viewChangeHandler, this._api, this._cardControlChangeHandler);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
  }

  _renderExtraCards(films, container) {
    const newFilms = renderCards(films, container, this._dataChangeHandler, this._viewChangeHandler, this._api, this._cardControlChangeHandler);

    this._showedExtraFilmControllers = this._showedExtraFilmControllers.concat(newFilms);
  }

  _updateCards(count) {
    this._removeCards();
    this._renderCards(this._filmsModel.getFilms().slice(0, count), this._filmListContainer);
    this.renderExtraFilmLists(this._container.getElement(), this._filmsModel.getAllFilms());
    this.renderButtonShow();
  }

  _updateSortedCards(count) {
    this._removeCards();
    const sortedFilms = getSortedFilms[this._sortComponent.getType()](this._filmsModel.getFilms(), 0, count);

    this._renderCards(sortedFilms, this._filmListContainer);

    this.renderExtraFilmLists(this._container.getElement(), this._filmsModel.getAllFilms());
    this.renderButtonShow();
    if (this._filmsModel.getFilms().length === 0) {
      this._removeCards();
      remove(this._buttonShowComponent);
      render(this._container.getElement(), this._noFilmComponent, Position.AFTERBEGIN);
      return;
    }
  }

  _buttonShowClickHandler() {
    let prevCardsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + SHOW_CARD_AMOUNT;

    const sortedFilms = getSortedFilms[this._sortComponent.getType()](this._filmsModel.getFilms(), prevCardsCount, this._showingFilmsCount);

    this._renderCards(sortedFilms, this._filmListContainer);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      remove(this._buttonShowComponent);
    }
  }

  _sortTypeChangeHandler(sortType) {
    this._showingFilmsCount = SHOW_CARD_AMOUNT;
    this._sortComponent.setType(sortType);
    const sortedFilms = getSortedFilms[sortType](this._filmsModel.getFilms(), 0, this._showingFilmsCount);

    this._removeCards();
    this._renderCards(sortedFilms, this._filmListContainer);

    this.renderButtonShow();
    this.renderExtraFilmLists(this._container.getElement(), this._filmsModel.getAllFilms());
  }

  _filterChangeHandler() {
    if (this._filmsModel.getFilms().length === 0) {
      this._removeCards();
      remove(this._buttonShowComponent);
      render(this._container.getElement(), this._noFilmComponent, Position.AFTERBEGIN);
      return;
    }

    remove(this._noFilmComponent);
    this._updateCards(SHOW_CARD_AMOUNT);

    this._sortComponent.setType(SortType.DEFAULT);
    this._sortComponent.rerender();
  }


  _dataChangeHandler(movieController, oldData, newData, mode) {
    this._api.updateFilm(oldData.id, newData)
        .then((filmModel) => {
          const isSuccess = this._filmsModel.updateFilm(oldData.id, filmModel);

          if (isSuccess) {
            movieController.render(filmModel);
            this._rerenderProfileHeader();

            if (mode === Mode.DEFAULT) {
              this._updateSortedCards(this._showingFilmsCount);
            }
          }
        });
  }

  _viewChangeHandler() {
    this._showedFilmControllers.forEach((controller) => controller.setDefaultView());
    this._showedExtraFilmControllers.forEach((controller) => controller.setDefaultView());
  }
}
