export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.original = data[`film_info`][`alternative_title`];
    this.poster = data[`film_info`][`poster`];
    this.filmAge = data[`film_info`][`age_rating`];
    this.rate = data[`film_info`][`total_rating`];
    this.year = data[`film_info`][`release`][`date`];
    this.details = [
      {
        name: `Director`,
        info: data[`film_info`][`director`]
      }, {
        name: `Writers`,
        info: data[`film_info`][`writers`]
      }, {
        name: `Actors`,
        info: data[`film_info`][`actors`]
      }, {
        name: `Release Date`,
        info: data[`film_info`][`release`][`date`]
      }, {
        name: `Runtime`,
        info: data[`film_info`][`runtime`]
      }, {
        name: `Country`,
        info: data[`film_info`][`release`][`release_country`]
      },
    ];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.comments = data[`comments`];
    this.inWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.inHistory = Boolean(data[`user_details`][`already_watched`]);
    this.inFavorites = Boolean(data[`user_details`][`favorite`]);
    this.watchDate = data[`user_details`][`watching_date`];
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.title,
        "alternative_title": this.original,
        "total_rating": this.rate,
        "poster": this.poster,
        "age_rating": this.filmAge,
        "director": this.details[0][`info`],
        "writers": this.details[1][`info`],
        "actors": this.details[2][`info`],
        "release": {
          "date": this.details[3][`info`],
          "release_country": this.details[5][`info`]
        },
        "runtime": this.details[4][`info`],
        "genre": this.genres,
        "description": this.description
      },
      "user_details": {
        "watchlist": this.inWatchlist,
        "already_watched": this.inHistory,
        "watching_date": this.watchDate,
        "favorite": this.inFavorites
      }
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
