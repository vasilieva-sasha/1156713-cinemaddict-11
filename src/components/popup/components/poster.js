const createFilmPosterMarkup = (poster, age) => {
  return (
    `<div class="film-details__poster">
      <img class="film-details__poster-img" src="./${poster}" alt="">
      <p class="film-details__age">${age}+</p>
    </div>`
  );
};

export {createFilmPosterMarkup};
