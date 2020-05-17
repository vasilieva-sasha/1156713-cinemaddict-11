import {createCommentsMurkup} from "./comments-list-markup";
import Comment from "../../comments";

const createCommentsList = (comments) => {
  const listMarkup = comments.map((comment) => new Comment(comment).getTemplate()).join(`\n`);

  return (
    createCommentsMurkup(listMarkup, comments)
  );
};

export {createCommentsList};
