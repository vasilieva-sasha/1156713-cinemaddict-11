import {FormatDate} from "../../consts/consts";
import moment from "moment";


export const hideText = (text) => {
  const textString = text.toString();
  if (textString.length > 140) {
    return textString.slice(0, 139) + `...`;
  } else {
    return textString;
  }
};

export const getCommentDate = (commentDate) => {
  const today = new Date();

  if (commentDate === today) {
    return moment(commentDate).fromNow();
  } else {
    return formatDate(commentDate, FormatDate.COMMENT_DATE);
  }
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
  } else if (count > 0 && count <= 10) {
    profileRange = `Novice`;
  } else if (count > 10 && count <= 20) {
    profileRange = `Fan`;
  } else {
    profileRange = `Movie Buff`;
  }
  return profileRange;
};
