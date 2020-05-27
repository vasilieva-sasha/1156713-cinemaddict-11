import AbstractSmartComponent from "../abstract-smart-component";
import {createCommentTemplate} from "./components/comments/comment-markup";
import {createCommentsMurkup} from "./components/comments/comments-list-markup";
import {getRandomElement, createElement} from "../../tools/utils/utils";
import {NAMES, EMOJI_SIZE} from "../../consts/consts";
import {encode} from "he";

const SHAKE_ANIMATION_TIMEOUT = 600;
const SHAKE_LENGTH = 1000;

export default class Comments extends AbstractSmartComponent {
  constructor(comments, onDataChange, api) {
    super();

    this._comments = comments;
    this._api = api;
    this._newComment = null;
    this._onDataChange = onDataChange;
    // this.newComments = this._comments;
    this.newCommentObject = {};

    this._isEmoji = false;
    this._emoji = null;
    this._emojiContainer = null;
    this._emojiRadio = null;

    this._commentDelete = null;
    this.onCommentDelete = this.onCommentDelete.bind(this);
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
        button.addEventListener(`click`, handler);
        this._commentDelete = handler;
      });
  }

  createNewCommentObject() {
    this.newCommentObject = {
      comment: this._onCommentChange(),
      author: getRandomElement(NAMES),
      date: new Date().toISOString(),
      emotion: this._emoji,
    };

    return this.newCommentObject;
  }

  addComment(newComment) {
    const commentList = this.getElement().querySelector(`.film-details__comments-list`);

    const input = this.getElement().querySelector(`.film-details__comment-input`);
    input.setAttribute(`disabled`, `disabled`);

    this.createNewCommentObject();
    this._newComment = createElement(createCommentTemplate(newComment));

    commentList.append(this._newComment);

    this._clearInput();
  }

  errorSendHandler() {
    const input = this.getElement().querySelector(`.film-details__comment-input`);
    input.removeAttribute(`disabled`);

    const newCommentBlock = this.getElement().querySelector(`.film-details__new-comment`);
    newCommentBlock.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / SHAKE_LENGTH}s`;

    newCommentBlock.querySelector(`.film-details__comment-input`).style.border = `2px solid red`;

    setTimeout(() => {
      newCommentBlock.style.animation = ``;
      newCommentBlock.style.animation = ``;
      newCommentBlock.querySelector(`.film-details__comment-input`).style.border = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  errorDeleteHandler(evt) {
    const commentBlock = evt.target.closest(`.film-details__comment`);
    commentBlock.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / SHAKE_LENGTH}s`;

    setTimeout(() => {
      commentBlock.style.animation = ``;
      commentBlock.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
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

  onCommentDelete(evt) {
    evt.preventDefault();

    const comment = evt.target.closest(`.film-details__comment`);
    const commentId = comment.dataset.id;
    const deleteButton = evt.target;

    this._api.deleteComment(commentId)
      .then(() => {
        deleteButton.innerHTML = `Deleting...`;
        deleteButton.setAttribute(`disabled`, `disabled`);
        comment.remove();
      })
      .catch(() => {
        deleteButton.removeAttribute(`disabled`, `disabled`);
        this.errorDeleteHandler(evt);
      });
  }

  _updateCommentsCount() {
    this.getElement().querySelector(`.film-details__comments-count`)
      .textContent = this._comments.length;
  }
}
