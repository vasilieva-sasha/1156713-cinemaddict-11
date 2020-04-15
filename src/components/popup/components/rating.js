const createFilmRatingMarkup = (rate) => {
  return (
    `<div class="film-details__rating">
      <p class="film-details__total-rating">${rate}</p>
    </div>`
  );
};

export {createFilmRatingMarkup};
