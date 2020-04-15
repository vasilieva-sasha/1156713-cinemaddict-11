import {getRightWordComments} from "./../mock/comments/comment";
import {hideText} from "./../tools/utils";

const createCardTemplate = (card) => {
  const {title, poster, filmAge, ageRate, genres, description, comments} = card;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title.title}</h3>
      <p class="film-card__rating">${ageRate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmAge}</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">${genres.slice(0, 1)}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${hideText(description)}</p>
      <a class="film-card__comments">${comments.length} ${getRightWordComments(comments).toLowerCase()}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createCardTemplate};
