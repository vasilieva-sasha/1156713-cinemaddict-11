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

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

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
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new Navigation(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, Position.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;

    this._filmsModel.setFilter(filterType);
    console.log(this._activeFilterType);
  }

  _onDataChange() {
    this.render();
  }
}
