import {WEEK} from "../../consts/consts";

export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomArray = (array) => {
  const randomArray = array.slice(0, Math.floor(Math.random() * array.length));
  return randomArray;
};

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const hideText = (text) => {
  const textString = text.toString();
  if (textString.length > 140) {
    return textString.slice(0, 139) + `...`;
  } else {
    return textString;
  }
};

export const getBoolean = () => Math.random() > 0.5;

export const getCommentDate = (commentDate) => {
  const today = new Date();

  if (commentDate.getDate() === today.getDate()) {
    return `Today`;
  } else if ((today.getFullYear() === commentDate.getFullYear())
    && (today.getMonth() - commentDate.getMonth())
    && ((today.getDate() - commentDate.getDate()) <= WEEK)) {
    return `${(today.getDate() - commentDate.getDate())} days ago`;
  } else {
    return `${commentDate.getFullYear()}/${commentDate.getMonth()}/${commentDate.getDate()}`;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
