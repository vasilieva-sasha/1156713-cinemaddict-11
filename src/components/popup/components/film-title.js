const createFilmTitleMarkup = (title, original) => {
  return (
    `<div class="film-details__title-wrap">
      <h3 class="film-details__title">${title}</h3>
      <p class="film-details__title-original">Original: ${original}</p>
    </div>`
  );
};

export {createFilmTitleMarkup};
