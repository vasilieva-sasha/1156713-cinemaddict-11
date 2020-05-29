import {FormatDate} from "../consts/consts";
import {formatDate} from "../tools/utils/utils";

export default class Movie {
  constructor(movieData) {
    this.id = movieData[`id`];
    this.title = movieData[`film_info`][`title`];
    this.original = movieData[`film_info`][`alternative_title`];
    this.poster = movieData[`film_info`][`poster`];
    this.filmAge = movieData[`film_info`][`age_rating`];
    this.rate = movieData[`film_info`][`total_rating`];
    this.year = movieData[`film_info`][`release`][`date`];
    this.details = {
      director: {
        name: `Director`,
        info: movieData[`film_info`][`director`]
      },
      writers: {
        name: `Writers`,
        info: movieData[`film_info`][`writers`]
      },
      actors: {
        name: `Actors`,
        info: movieData[`film_info`][`actors`]
      },
      release: {
        name: `Release Date`,
        info: formatDate(movieData[`film_info`][`release`][`date`], FormatDate.RELEASE_DATE)
      },
      runtime: {
        name: `Runtime`,
        info: movieData[`film_info`][`runtime`]
      },
      country: {
        name: `Country`,
        info: movieData[`film_info`][`release`][`release_country`]
      },
    };
    this.genres = movieData[`film_info`][`genre`];
    this.description = movieData[`film_info`][`description`];
    this.comments = movieData[`comments`];
    this.commentsList = [];
    this.inWatchlist = Boolean(movieData[`user_details`][`watchlist`]);
    this.inHistory = Boolean(movieData[`user_details`][`already_watched`]);
    this.inFavorites = Boolean(movieData[`user_details`][`favorite`]);
    this.watchDate = movieData[`user_details`][`watching_date`];
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
        "director": this.details.director.info,
        "writers": this.details.writers.info,
        "actors": this.details.actors.info,
        "release": {
          "date": new Date(this.details.release.info).toISOString(),
          "release_country": this.details.country.info
        },
        "runtime": this.details.runtime.info,
        "genre": this.genres,
        "description": this.description
      },
      "user_details": {
        "watchlist": this.inWatchlist,
        "already_watched": this.inHistory,
        "watching_date": this.watchDate ? new Date(this.watchDate).toISOString() : null,
        "favorite": this.inFavorites
      }
    };
  }

  static parseMovie(movieData) {
    return new Movie(movieData);
  }

  static parseMovies(moviesData) {
    return moviesData.map(Movie.parseMovie);
  }

  static clone(movieData) {
    return new Movie(movieData.toRAW());
  }
}
