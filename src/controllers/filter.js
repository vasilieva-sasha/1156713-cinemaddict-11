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

    this._activeFilterType = `all`;
    this._filterComponent = null;

    this._onStatsClick = null;
    this._onFilterClick = null;
    this._onDataChange = this._onDataChange.bind(this);

    this.setStatisticHandler = this.setStatisticHandler.bind(this);
    this.setFilterChangeHandler = this.setFilterChangeHandler.bind(this);


    this._filmsModel.setDataChangeHandler(this._onDataChange);

  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getAllFilms();

    const filters = Object.keys(FilterType).map((filterType) => {
      return {
        name: FilterType[filterType],
        link: filterType.toLowerCase(),
        count: getFilteredFilms[filterType.toLowerCase()](allFilms).length,
        checked: this._activeFilterType === filterType.toLowerCase(),
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new Navigation(filters);

    if (this._onFilterClick) {
      this.setFilterChangeHandler(this._onFilterClick);
    }


    if (this._onStatsClick) {
      this._filterComponent.setStatsSelectHandler(this._onStatsClick);
    }


    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, Position.BEFOREEND);
    }

  }

  setFilterChangeHandler(handler) {
    this._filterComponent.setFilterChangeHandler(handler);

    this._onFilterClick = handler;
  }

  setStatisticHandler(handler) {
    this._filterComponent.setStatsSelectHandler(handler);

    this._onStatsClick = handler;
  }

  _onDataChange() {
    this.render();
  }
}
