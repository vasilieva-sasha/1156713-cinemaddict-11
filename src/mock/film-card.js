import {NAMES, COUNTRIES, GENRES, MONTH_NAMES, FormatDate} from "./../consts/consts";
import {FIRST_RELEASE_DATE, TITLES, POSTERS, DESCRIPTIONS, AGE_RATES, HOURS, MINUTES} from "./consts/consts";
import {getRandomElement, getRandomArray, getRandomDate, shuffle, getBoolean, formatDate} from "./../tools/utils/utils";
import {renderFilmCommentsArray} from "./comments/comment";

const getRandomHours = () => Math.floor(Math.random() * HOURS);
const getRandomMinutes = () => Math.floor(Math.random() * MINUTES);

const generateFilmCard = () => ({
  id: String(new Date() + Math.random()),
  title: getRandomElement(TITLES),
  poster: getRandomElement(POSTERS),
  filmAge: getRandomElement(AGE_RATES),
  rate: (Math.random() * 10).toFixed(1),
  year: formatDate(getRandomDate(new Date([...FIRST_RELEASE_DATE]), new Date()), FormatDate.RELEASE_YEAR),
  details: [
    {
      name: `Director`,
      info: shuffle(NAMES).slice(0, 1)
    }, {
      name: `Writers`,
      info: getRandomArray(shuffle(NAMES))
    }, {
      name: `Actors`,
      info: getRandomArray(shuffle(NAMES))
    }, {
      name: `Release Date`,
      info: formatDate(getRandomDate(new Date([...FIRST_RELEASE_DATE]), new Date()), FormatDate.RELEASE_DATE)
    }, {
      name: `Runtime`,
      info: getRandomHours() > 0 ? formatDate(getRandomHours(), FormatDate.FILM_DURATION) : formatDate(getRandomHours(), FormatDate.FILM_DURATION)
    }, {
      name: `Country`,
      info: getRandomElement(COUNTRIES)
    },
  ],
  genres: getRandomArray(shuffle(GENRES)),
  description: getRandomArray(DESCRIPTIONS),
  comments: renderFilmCommentsArray(),
  inWatchlist: getBoolean(),
  inHistory: getBoolean(),
  inFavorites: getBoolean(),
});

const generateFilmCardsArray = (count) => new Array(count).fill(``).map(generateFilmCard);

export {generateFilmCardsArray};
