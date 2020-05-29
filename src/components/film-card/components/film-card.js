import {hideText, formatDate, getRightWordComments, getFilmDuration} from "./../../../tools/utils/utils";
import {ControlType, FormatDate} from "../../../consts/consts";

const isActive = (controlProperty) => controlProperty ? `film-card__controls-item--active` : ``;

const createFilmCardTemplate = (card) => {
  const {title, poster, rate, year, genres, description, comments, details, inWatchlist, inHistory, inFavorites} = card;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatDate(year, FormatDate.RELEASE_YEAR)}</span>
        <span class="film-card__duration">${getFilmDuration(details.runtime.info)}</span>
        <span class="film-card__genre">${genres.slice(0, 1)}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${hideText(description[0].toUpperCase() + description.substring(1))}</p>
      <a class="film-card__comments">${comments.length} ${getRightWordComments(comments).toLowerCase()}</a>
      <form class="film-card__controls">
        <button data-control-type="${ControlType.WATCHLIST}" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isActive(inWatchlist)}">Add to watchlist</button>
        <button data-control-type="${ControlType.HISTORY}" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isActive(inHistory)}">Mark as watched</button>
        <button data-control-type="${ControlType.FAVORITES}" class="film-card__controls-item button film-card__controls-item--favorite ${isActive(inFavorites)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createFilmCardTemplate, isActive};
