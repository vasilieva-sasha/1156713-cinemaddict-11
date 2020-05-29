import {getFilmDuration} from "../../../tools/utils/utils";

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

const getCorrectWord = (genres) => {
  switch (genres.length) {
    case 0:
      return ``;
    case 1:
      return `Genre`;
    default:
      return `Genres`;
  }
};

const createTableRowsMarkup = (rows) => rows.map(createTableRowMarkup).join(`\n`);

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

const updateFormatDuration = (runtime) => {
  return {
    name: runtime.name,
    info: getFilmDuration(runtime.info)
  };
};

const addSpaces = (details) => {
  return {
    name: details.name,
    info: details.info.join(`, `)
  };
};

const getRows = ({director, writers, actors, release, runtime, country}) =>
  Object.values({
    director,
    writers: addSpaces(writers),
    actors: addSpaces(actors),
    release,
    runtime: updateFormatDuration(runtime),
    country
  });

const createTableTemplate = (details, genres) => {
  return (
    `<table class="film-details__table">
    ${createTableRowsMarkup(getRows(details))}
    ${createGenresRow(genres)}
    </table>`
  );
};

export {createTableTemplate};
