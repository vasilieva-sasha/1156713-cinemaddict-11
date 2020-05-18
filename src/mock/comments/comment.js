import {getRandomElement, getRandomDate, getCommentDate} from "../../tools/utils/utils";
import {COMMENTS, EMOJIS, COMMENTS_COUNT, FIRST_COMMENT_DATE} from "../consts/consts";
import {NAMES} from "./../../consts/consts";

const generateFilmComment = () => ({
  id: Math.floor(Math.random() * 898),
  text: getRandomElement(COMMENTS),
  name: getRandomElement(NAMES),
  date: getCommentDate(getRandomDate(new Date([...FIRST_COMMENT_DATE]), new Date())),
  emoji: getRandomElement(EMOJIS)
});

const getRightWordComments = (comments) => comments.length % 10 === 1 ? `Comment` : `Comments`;

const renderFilmCommentsArray = () => {
  const filmCommentsArray = [];

  for (let i = 0; i < (Math.floor(Math.random() * COMMENTS_COUNT)); i++) {
    filmCommentsArray.push(generateFilmComment());
  }

  return filmCommentsArray;
};

export {getRightWordComments, renderFilmCommentsArray};
