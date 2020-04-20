import {createFilmTitleMarkup} from "./film-title";
import {createFilmRatingMarkup} from "./rating";
import {createFilmPosterMarkup} from "./poster";
import {createTableTemplate} from "./table";
import {createPopupControlMurkup} from "./control";
import {createCommentsList} from "./comments/create-comment-list";

const createPopupTemplate = (card) => {
  const {title, poster, filmAge, ageRate, details, genres, description, comments} = card;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            ${createFilmPosterMarkup(poster, filmAge)}

            <div class="film-details__info">
              <div class="film-details__info-head">
                ${createFilmTitleMarkup(title)}

                ${createFilmRatingMarkup(ageRate)}
              </div>
                ${createTableTemplate(details, genres)}
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          ${createPopupControlMurkup()}
        </div>

        <div class="form-details__bottom-container">
          ${createCommentsList(comments)}
        </div>
      </form>
    </section>`
  );
};

export {createPopupTemplate};
