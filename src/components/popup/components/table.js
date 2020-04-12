const createTableRowMarkup = ({name, info}) => {
  return (
    `<tr class="film-details__row">
      <td class="film-details__term">${name}</td>
      <td class="film-details__cell">${info}</td>
    </tr>`
  );
};

const createGenres = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`);
};

const getCorrectWord = (genres) => genres.length === 1 ? `Genre` : `Genres`;
const createGenresRow = (genres) => {
  return (
    `<tr class="film-details__row">
      <td class="film-details__term">${getCorrectWord(genres)}</td>
      <td class="film-details__cell">
        ${createGenres(genres)}
      </td>
    </tr>`
  );
};

export const createTableTemplate = (details, genres) => {
  const tableRowMarkup = details.map((detail) => createTableRowMarkup(detail)).join(`\n`);
  return (
    `<table class="film-details__table">
    ${tableRowMarkup}
    ${createGenresRow(genres)}
    </table>`
  );
};
