import {createFilmTitleMarkup} from "./components/film-title.js";
import {createFilmRatingMarkup} from "./components/rating.js";
import {createFilmPosterMarkup} from "./components/poster.js";
import {createTableTemplate} from "./components/table.js";
import {createPopupControlMurkup} from "./components/control.js";
import {createCommentsList} from "./components/comments.js";

export const createPopupTemplate = (card) => {
  const {filmTitle, filmPoster, filmAge, filmRate, filmDetails, filmGenres, filmDescription, filmComments} = card;
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            ${createFilmPosterMarkup(filmPoster, filmAge)}

            <div class="film-details__info">
              <div class="film-details__info-head">
                ${createFilmTitleMarkup(filmTitle)}

                ${createFilmRatingMarkup(filmRate)}
              </div>
                ${createTableTemplate(filmDetails, filmGenres)}
              <p class="film-details__film-description">
                ${filmDescription}
              </p>
            </div>
          </div>

          ${createPopupControlMurkup()}
        </div>

        <div class="form-details__bottom-container">
          ${createCommentsList(filmComments)}
        </div>
      </form>
    </section>`
  );
};
