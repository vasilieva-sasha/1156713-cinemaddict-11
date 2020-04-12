export const createFilmTableMarkup = () => {
  return (
    `<table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">Anthony Mann</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">30 March 1945</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">1h 18m</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">USA</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">
          <span class="film-details__genre">Drama</span>
          <span class="film-details__genre">Film-Noir</span>
          <span class="film-details__genre">Mystery</span></td>
      </tr>
    </table>`
  );
};

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

const createGenresRow = (genres) => {
  return (
    `<tr class="film-details__row">
      <td class="film-details__term">Genres</td>
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
