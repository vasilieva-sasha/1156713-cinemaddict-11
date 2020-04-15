import {NAMES, COUNTRIES, GENRES, MONTH_NAMES} from "./../consts/consts";
import {FIRST_RELEASE_DATE, TITLES, POSTERS, DESCRIPTIONS, AGE_RATES, HOURS, MINUTES} from "./consts/consts";
import {getRandomElement, getRandomArray, getRandomDate} from "./../tools/utils";
import {shuffle, getBoolean} from "./../tools/utils";
import {renderFilmCommentsArray} from "./comments/comment";

const getRandomHours = () => Math.floor(Math.random() * HOURS);
const getRandomMinutes = () => Math.floor(Math.random() * MINUTES);

const generateFilmCard = () => ({
  title: getRandomElement(TITLES),
  poster: getRandomElement(POSTERS),
  filmAge: getRandomElement(AGE_RATES),
  ageRate: (Math.random() * 10).toFixed(1),
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
      info: `${getRandomDate(new Date([...FIRST_RELEASE_DATE]), new Date()).getDate()}
      ${MONTH_NAMES[getRandomDate(new Date([...FIRST_RELEASE_DATE]), new Date()).getMonth()]}
      ${getRandomDate(new Date([...FIRST_RELEASE_DATE]), new Date()).getFullYear()}`
    }, {
      name: `Runtime`,
      info: getRandomHours() > 0 ? `${getRandomHours()}h ${getRandomMinutes()}m` : `${getRandomMinutes()}m`
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
