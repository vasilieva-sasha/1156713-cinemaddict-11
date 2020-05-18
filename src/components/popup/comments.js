import AbstractSmartComponent from "../abstract-smart-component";
import {createCommentTemplate} from "./components/comments/comment-markup";

export default class Comment extends AbstractSmartComponent {
  constructor(comment) {
    super();

    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
