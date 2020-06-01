import {TextLength, MINUTES_IN_HOUR, ProfileRank} from "../../consts/consts";
import moment from "moment";

export const hideText = (text) => {
  const textString = text.toString();
  if (textString.length > TextLength.MAX) {
    return textString.slice(0, TextLength.MIN) + `...`;
  } else {
    return textString;
  }
};

export const getFilmDuration = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_HOUR);
  const minutes = duration % MINUTES_IN_HOUR;
  const filmDuration = `${hours}h ${minutes}m`;
  return filmDuration;
};

export const getCommentDate = (commentDate) => {
  return moment(commentDate).fromNow();
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const formatDate = (date, format) => {
  return moment(date).format(format);
};

export const getDateFromString = (date) => {
  return moment(date).valueOf();
};

export const getProfileRange = (count) => {
  let profileRange;
  if (count === 0) {
    profileRange = ``;
  } else if (count >= ProfileRank.NOVICE.from && count < ProfileRank.FUN.from) {
    profileRange = ProfileRank.NOVICE.rank;
  } else if (count >= ProfileRank.FUN.from && count < ProfileRank.MOVIE_BUFF.from) {
    profileRange = ProfileRank.FUN.rank;
  } else {
    profileRange = ProfileRank.MOVIE_BUFF.rank;
  }
  return profileRange;
};

export const getRightWordComments = (comments) => comments.length % 10 === 1 ? `Comment` : `Comments`;
