import AbstractSmartComponent from "../abstract-smart-component";
import {createCommentTemplate} from "./components/comments/comment-markup";
import {createCommentsMurkup} from "./components/comments/comments-list-markup";
import {getRandomElement, createElement} from "../../tools/utils/utils";
import {NAMES, EMOJI_SIZE} from "../../consts/consts";
import {encode} from "he";

export default class Comments extends AbstractSmartComponent {
  constructor(comments, api) {
    super();

    this._comments = comments;
    this._api = api;
    this._newComment = null;
    // this.newComments = this._comments;
    this.newCommentObject = {};

    this._isEmoji = false;
    this._emoji = null;
    this._emojiContainer = null;
    this._emojiRadio = null;

    // this._commentDelete = null;
    // this._onCommentDelete = this._onCommentDelete.bind(this);
    this._onEmojiChange = this._onEmojiChange.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
  }

  getTemplate() {
    const listMarkup = this._comments.map((comment) => this.getComment(comment)).join(`\n`);

    return createCommentsMurkup(listMarkup, this._comments);
  }

  getComment(comment) {
    return createCommentTemplate(comment);
  }

  recoveryListeners() {
    this.setEmojiChangeHandler();
    this.setOnCommentDelete(this._commentDelete);
  }

  setEmojiChangeHandler() {
    this.getElement().querySelectorAll(`.film-details__emoji-label`)
      .forEach((label) => {
        label.addEventListener(`click`, () => {
          this._onEmojiChange(label);
        });
      });
  }

  setOnCommentDelete(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((button) => {
        button.addEventListener(`click`, (evt) => {
          this._onCommentDelete(evt);
          handler();
        });
        this._commentDelete = handler;
      });
  }

  createNewCommentObject() {
    this.newCommentObject = {
      text: this._onCommentChange(),
      name: getRandomElement(NAMES),
      date: new Date().toISOString(),
      emoji: this._emoji,
    };

    return this.newCommentObject;
  }

  addComment() {
    const commentList = this.getElement().querySelector(`.film-details__comments-list`);
    // this.newCommentObject = {
    //   text: this._onCommentChange(),
    //   name: getRandomElement(NAMES),
    //   date: new Date().toISOString(),
    //   emoji: this._emoji,
    // };
    // this.newComments = this.newComments.concat(this.newCommentObject);

    this._newComment = createElement(createCommentTemplate(this.newCommentObject));

    commentList.append(this._newComment);
    console.log(this.newCommentObject);

    this._clearInput();
  }

  _onEmojiChange(label) {
    this._emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    const labelId = label.getAttribute(`for`);

    this._emojiRadio = this.getElement().querySelector(`input[id="${labelId}"]`);
    this._emojiRadio.setAttribute(`checked`, `checked`);

    this._emoji = this.getElement().querySelector(`input[id="${labelId}"]`).getAttribute(`value`);

    const emojiImage = label.querySelector(`img`).cloneNode(true);
    emojiImage.setAttribute(`height`, EMOJI_SIZE);
    emojiImage.setAttribute(`width`, EMOJI_SIZE);

    if (this._isEmoji === false) {
      this._emojiContainer.appendChild(emojiImage);
      this._isEmoji = true;
    } else {
      this._emojiContainer.removeChild(this._emojiContainer.querySelector(`img`));
      this._emojiContainer.appendChild(emojiImage);
    }
  }

  _onCommentChange() {
    const commentText = encode(this.getElement().querySelector(`.film-details__comment-input`).value);
    return commentText;
  }

  // наверное убрать
  _clearInput() {
    this._emojiContainer.removeChild(this._emojiContainer.querySelector(`img`));
    this._emojiRadio.removeAttribute(`checked`);
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
    this._isEmoji = false;
  }

  // _onCommentDelete(evt) {
  //   evt.preventDefault();

  //   const comment = evt.target.closest(`.film-details__comment`);
  //   const CommentId = evt.target.dataset.id;

  //   const deletedComment = this.newComments.includes(CommentId);

  //   this.newComments.splice([deletedComment], 1);

  //   comment.remove();
  // }
}
