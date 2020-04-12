import {getRandomElement, getRandomDate} from "../tools/utils.js";

const commentTitles = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `The best I've ever seen!`
];

const commentNames = [
  `Tim Macoveev`,
  `John Doe`,
  `Vasya Pupkin`,
  `Brad Pitt`,
];

const commentEmojis = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const generateFilmComment = () => {
  return {
    text: getRandomElement(commentTitles),
    name: getRandomElement(commentNames),
    date: getRandomDate(new Date(2015, 0, 1), new Date()),
    emoji: getRandomElement(commentEmojis)
  };
};

export const renderFilmCommentsArray = () => {
  const filmCommentsArray = [];
  for (let i = 0; i < (Math.floor(Math.random() * 5)); i++) {
    filmCommentsArray.push(generateFilmComment());
  }
  return filmCommentsArray;
};
