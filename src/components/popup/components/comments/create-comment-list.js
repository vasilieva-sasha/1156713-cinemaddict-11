import {createCommentsMurkup} from "./comments-list-markup";
import {createCommentTemplate} from "./comment-markup";

const createCommentsList = (comments) => {
  const listMarkup = comments.map(createCommentTemplate).join(`\n`);

  return (
    createCommentsMurkup(listMarkup, comments)
  );
};

export {createCommentsList};
