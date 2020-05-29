import {getFilteredFilms} from "../components/navigation/components/navigation";
import {getDateFromString, getProfileRange} from "../tools/utils/utils";
import moment from "moment";
import {DEFAULT_FILTER_TYPE, DEFAULT_FILTER_TYPE_STATS, STATISTIC_FILTER} from "../consts/consts";

export default class Movies {
  constructor() {
    this._films = [];
    this.activeFilterType = DEFAULT_FILTER_TYPE;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this.setFilterChangeHandler = this.setFilterChangeHandler.bind(this);
    this.getWatchedFilms = this.getWatchedFilms.bind(this);
    this.getWatchedFilmsCountByGenre = this.getWatchedFilmsCountByGenre.bind(this);
  }

  getFilms() {
    return getFilteredFilms[this.activeFilterType](this._films);
  }

  getAllFilms() {
    return this._films;
  }

  getWatchedFilms() {
    return this._films.filter((film) => {
      return film.inHistory;
    });
  }

  getProfileRange() {
    return getProfileRange(this.getWatchedFilms().length);
  }

  getFilmGenres(filterType) {
    return this.getFilteredFilmsforStats(filterType).reduce((filmGenres, film) => {
      film.genres.forEach((genre) => {
        if (!filmGenres.includes(genre)) {
          filmGenres.push(genre);
        }
      });
      return filmGenres;
    }, []);
  }

  getWatchedFilmsCountByGenre(films, filterType) {
    return this.getFilmGenres(filterType).map((genre) => {
      return {
        name: genre,
        count: films.filter((film) => film.genres.includes(genre)).length
      };
    }).sort((less, more) => more.count - less.count);
  }

  getFilmsByDateForStatistics(period) {
    const watchedFilms = this.getWatchedFilms();

    switch (period) {
      case DEFAULT_FILTER_TYPE_STATS:
        return watchedFilms;
      default:
        return watchedFilms.filter((film) => getDateFromString(film.watchDate) >= moment().subtract(1, period));
    }

  }

  getWatchedMoviesLength(filterType) {
    const watchedFilms = this.getFilteredFilmsforStats(filterType);

    return watchedFilms.reduce((length, film) => {
      return length + film.details.runtime.info;
    }, 0);
  }

  getFilteredFilmsforStats(filterType) {
    return filterType === STATISTIC_FILTER[0].period ? this.getWatchedFilms() : this.getFilmsByDateForStatistics(filterType);
  }

  getStisticsResults(filterType) {
    return {
      filmCount: this.getFilteredFilmsforStats(filterType).length,
      hoursCount: this.getWatchedMoviesLength(filterType),
      genre: this.getWatchedFilmsCountByGenre(this.getFilteredFilmsforStats(filterType), filterType).map((genre) => genre.name).slice(0, 1)
    };
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this.activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((card) => card.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
