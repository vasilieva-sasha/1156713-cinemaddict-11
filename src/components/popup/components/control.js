import {ControlType} from "../../../consts/consts";

const isChecked = (controlProperty) => controlProperty ? `checked` : ``;

const createPopupControlMurkup = (card) => {
  const {inWatchlist, inHistory, inFavorites} = card;

  return (
    `<section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isChecked(inWatchlist)}>
      <label data-control-type="${ControlType.WATCHLIST}" for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isChecked(inHistory)}>
      <label data-control-type="${ControlType.HISTORY}" for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isChecked(inFavorites)}>
      <label data-control-type="${ControlType.FAVORITES}" for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`
  );
};

export {createPopupControlMurkup};
