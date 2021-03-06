import {createFilmTitleMarkup} from "./film-title";
import {createFilmRatingMarkup} from "./rating";
import {createFilmPosterMarkup} from "./poster";
import {createTableTemplate} from "./table";
import {createPopupControlMurkup} from "./control";

const createPopupTemplate = (card) => {
  const {title, original, poster, filmAge, rate, details, genres, description} = card;

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
                ${createFilmTitleMarkup(title, original)}

                ${createFilmRatingMarkup(rate)}
              </div>
                ${createTableTemplate(details, genres)}
              <p class="film-details__film-description">
                ${description[0].toUpperCase() + description.substring(1)}
              </p>
            </div>
          </div>

          ${createPopupControlMurkup(card)}
        </div>

        <div class="form-details__bottom-container">

        </div>
      </form>
    </section>`
  );
};

export {createPopupTemplate};
