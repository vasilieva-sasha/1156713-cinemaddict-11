import {getRightWordComments} from "./../mock/comment.js";
import {hideText} from "./../tools/utils.js";

export const createCardTemplate = (card) => {
  const {filmTitle, filmPoster, filmAge, filmRate, filmGenres, filmDescription, filmComments} = card;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmTitle.title}</h3>
      <p class="film-card__rating">${filmRate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmAge}</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">${filmGenres.slice(0, 1)}</span>
      </p>
      <img src="./images/posters/${filmPoster}" alt="" class="film-card__poster">
      <p class="film-card__description">${hideText(filmDescription)}</p>
      <a class="film-card__comments">${filmComments.length} ${getRightWordComments(filmComments).toLowerCase()}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};
