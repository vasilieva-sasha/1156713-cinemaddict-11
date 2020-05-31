import Movie from "../models/movie";

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedMovies = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.task);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
      .then((movies) => {
        const items = createStoreStructure(movies.map((movie) => movie.toRAW()));

        this._store.setItems(items);

        return movies;
      });
    }

    const storeMovies = Object.values(this._store.getItems());
    return Promise.resolve(Movie.parseMovies(storeMovies));
  }

  getComments(id) {
    if (isOnline()) {
      return this._api.getComments(id);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  createComment(id, commentData) {
    if (isOnline()) {
      return this._api.createComment(id, commentData);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  deleteComment(id) {
    if (isOnline()) {
      return this._api.deleteComment(id);
    }

    return Promise.resolve();
  }

  updateFilm(id, filmData) {
    if (isOnline()) {
      return this._api.updateFilm(id, filmData)
      .then((newMovie) => {
        this._store.setItem(newMovie.id, newMovie.toRAW());

        return newMovie;
      });
    }

    const localMovie = Movie.clone(Object.assign(filmData, {id}));

    this._store.setItem(id, localMovie.toRAW());

    return Promise.resolve(localMovie);
  }

  sync() {
    if (isOnline()) {
      const storeMovies = Object.values(this._store.getItems());

      return this._api.sync(storeMovies)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const updatedMovies = getSyncedMovies(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...updatedMovies]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

}
