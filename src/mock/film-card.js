import {NAMES, COUNTRIES, GENRES, MONTH_NAMES} from "./../tools/consts.js";
import {getRandomElement, getRandomArray, getRandomDate} from "./../tools/utils.js";
import {shuffle, getBoolean} from "./../tools/utils.js";
import {renderFilmCommentsArray} from "./comment.js";

const filmTitles = [
  {
    title: `Созданы друг для друга`,
    original: `Made for Each Other`
  },
  {
    title: `Папай-морячок встречается с Синдбадом-мореходом`,
    original: `Popeye the sailor meets Sindbab the sailor`
  },
  {
    title: `След в полыни`,
    original: `Sagebrush trail`
  },
  {
    title: `Санта Клаус завоёвывает марсиан`,
    original: `Santa Claus conquers the Marthians`
  },
  {
    title: `Танец жизни`,
    original: `The dance of life`
  },
  {
    title: `Великий Фламарион`,
    original: `The great Flamarion`
  },
  {
    title: `Человек с золотой рукой`,
    original: `The man with the golden arm`
  },
];

const filmPosters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const filmDescriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const ageRates = [`0+`, `6+`, `12+`, `16+`, `18+`];

const getRandomHours = () => Math.floor(Math.random() * 3);
const getRandomMinutes = () => Math.floor(Math.random() * 59);

const generateFilmCard = () => {
  return {
    filmTitle: getRandomElement(filmTitles),
    filmPoster: getRandomElement(filmPosters),
    filmAge: getRandomElement(ageRates),
    filmRate: (Math.random() * 10).toFixed(1),
    filmDetails: [
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
        info: `${getRandomDate(new Date(1920, 0, 1), new Date()).getDate()}
        ${MONTH_NAMES[getRandomDate(new Date(1920, 0, 1), new Date()).getMonth()]}
        ${getRandomDate(new Date(1920, 0, 1), new Date()).getFullYear()}`
      }, {
        name: `Runtime`,
        info: getRandomHours() > 0 ? `${getRandomHours()}h ${getRandomMinutes()}m` : `${getRandomMinutes()}m`
      }, {
        name: `Country`,
        info: getRandomElement(COUNTRIES)
      },
    ],
    filmGenres: getRandomArray(shuffle(GENRES)),
    filmDescription: getRandomArray(filmDescriptions),
    filmComments: renderFilmCommentsArray(),
    isInWatchlist: getBoolean(),
    isInHistory: getBoolean(),
    isInFavorites: getBoolean(),
  };
};

export const generateFilmCardsArray = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};
