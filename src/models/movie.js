export default class Movie {
  constructor(data) {
    // console.log(data);

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

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }
}
