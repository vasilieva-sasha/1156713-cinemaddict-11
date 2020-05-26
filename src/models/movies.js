import {getFilteredFilms} from "../components/navigation/components/navigation";
import {getDateFromString} from "../tools/utils/utils";
import moment from "moment";

export default class Movies {
  constructor() {
    this._films = [];
    this._activeFilterType = `all`;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this.setFilterChangeHandler.bind(this);
  }

  getFilms() {
    return getFilteredFilms[this._activeFilterType](this._films);
  }

  getAllFilms() {
    return this._films;
  }

  getWatchedFilms() {
    return this._films.filter((film) => {
      return film.inHistory;
    });
  }

  getFilmGenres() {
    return this.getWatchedFilms().reduce((filmGenres, film) => {
      film.genres.forEach((genre) => {
        if (!filmGenres.includes(genre)) {
          filmGenres.push(genre);
        }
      });
      return filmGenres;
    }, []);
  }

  getWatchedFilmsCountByGenre() {
    return this.getFilmGenres().map((genre) => {
      return {
        name: genre,
        count: this.getWatchedFilms().filter((film) => film.genres.includes(genre)).length
      };
    }).sort((less, more) => more.count - less.count);
  }

  getFimsByDateForStatistics(period) {
    const watchedFilms = this.getWatchedFilms();

    switch (period) {
      case `all time`:
        return watchedFilms;
      default:
        return watchedFilms.filter((film) => getDateFromString(film.watchDate) >= moment().subtract(1, period) && getDateFromString(film.watchDate) <= new Date());
    }
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
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
