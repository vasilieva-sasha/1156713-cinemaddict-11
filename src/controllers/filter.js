import {FilterType, Position} from "../consts/consts";
import {replace, render} from "../tools/utils/render";
import Navigation from "../components/navigation/navigation";
import {getFilteredFilms} from "../components/navigation/components/navigation";
import FilmList from "../components/film-list/film-list";

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._filmListComponent = new FilmList();

    this._showedFilmControllers = [];

    this.activeFilterType = `all`;
    this._navigationComponent = null;

    this._statsClickHandler = null;
    this._changeHandler = null;
    this._dataChangeHandler = this._dataChangeHandler.bind(this);

    this.setStatisticHandler = this.setStatisticHandler.bind(this);
    this.setChangeHandler = this.setChangeHandler.bind(this);


    this._filmsModel.setDataChangeHandler(this._dataChangeHandler);

  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getAllFilms();

    const filters = Object.keys(FilterType).map((filterType) => {
      return {
        name: FilterType[filterType],
        link: filterType.toLowerCase(),
        count: getFilteredFilms[filterType.toLowerCase()](allFilms).length,
        checked: this.activeFilterType === filterType.toLowerCase(),
      };
    });

    const oldComponent = this._navigationComponent;

    this._navigationComponent = new Navigation(filters);

    if (this._changeHandler) {
      this.setChangeHandler(this._changeHandler);
    }


    if (this._statsClickHandler) {
      this._navigationComponent.setStatsSelectHandler(this._statsClickHandler);
    }


    if (oldComponent) {
      replace(this._navigationComponent, oldComponent);
    } else {
      render(container, this._navigationComponent, Position.BEFOREEND);
    }

  }

  setChangeHandler(handler) {
    this._navigationComponent.setFilterChangeHandler(handler);
    this._changeHandler = handler;
  }

  setStatisticHandler(handler) {
    this._navigationComponent.setStatsSelectHandler(handler);

    this._statsClickHandler = handler;
  }

  _dataChangeHandler() {
    this.render();
  }
}
