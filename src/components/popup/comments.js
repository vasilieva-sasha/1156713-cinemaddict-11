import AbstractSmartComponent from "../abstract-smart-component";
import {createCommentTemplate} from "./components/comments/comment-markup";
import {createCommentsMurkup} from "./components/comments/comments-list-markup";
import {createElement} from "../../tools/utils/utils";
import {EMOJI_SIZE, Mode, BORDER} from "../../consts/consts";
import {encode} from "he";
import Movie from "../../models/movie";
import Comment from "../../models/comment";

const SHAKE_ANIMATION_TIMEOUT = 600;
const SHAKE_LENGTH = 1000;

export default class Comments extends AbstractSmartComponent {
  constructor(card, dataChangeHandler, api, movieController) {
    super();

    this._card = card;
    this._list = this._card.commentsList;
    this._api = api;
    this._movieController = movieController;
    this._newComment = null;
    this._dataChangeHandler = dataChangeHandler;

    this._mode = Mode.OPEN;
    this._isEmoji = false;
    this._emoji = null;
    this._emojiContainer = null;
    this._emojiRadio = null;

    this._deleteHandlerHandler = null;
    this.deleteHandler = this.deleteHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
    this._ctrlEnterEventHandler = this._ctrlEnterEventHandler.bind(this);
  }

  getTemplate() {
    const listMarkup = this._list.map((comment) => this.getItemTemplate(comment)).join(`\n`);

    return createCommentsMurkup(listMarkup, this._list);
  }

  getItemTemplate(comment) {
    return createCommentTemplate(comment);
  }

  recoveryListeners() {
    this.setEmojiChangeHandler();
    this.setDeleteHandler(this._deleteHandlerHandler);
    this.setSendCommentHandler();
  }

  setEmojiChangeHandler() {
    this.getElement().querySelectorAll(`.film-details__emoji-label`)
      .forEach((label) => {
        label.addEventListener(`click`, () => {
          this._emojiChangeHandler(label);
        });
      });
  }

  setSendCommentHandler() {
    this.getElement().querySelector(`.film-details__new-comment`)
     .addEventListener(`keyup`, this._ctrlEnterEventHandler);
  }

  setDeleteHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((button) => {
        button.addEventListener(`click`, handler);
        this._deleteHandler = handler;
      });
  }

  addComment() {
    const newComment = this.createNewData();
    if (newComment.emotion && newComment.comment) {
      const newCommentModel = new Comment(newComment);

      const newFilm = Movie.clone(this._card);

      this._api.createComment(newFilm.id, newCommentModel)
        .then((comments) => {
          const newCommentData = comments[comments.length - 1];
          newFilm.comments.push(newCommentData.id);
          newFilm.commentsList.push(newCommentData);
          this.addCommentMarkup(newCommentModel);
          this._dataChangeHandler(this._movieController, this._card, newFilm, this._mode);
        })
        .catch(() => {
          this.errorSendHandler();
        });
    } else if (!newComment.comment) {
      this.validateInput();
    } else if (!newComment.emotion) {
      this.validateEmoji();
    }
  }

  createNewData() {
    return {
      comment: this._changeHandler(),
      date: new Date().toISOString(),
      emotion: this._emoji,
    };
  }

  addCommentMarkup(newComment) {
    const commentList = this.getElement().querySelector(`.film-details__comments-list`);

    const input = this.getElement().querySelector(`.film-details__comment-input`);
    input.setAttribute(`disabled`, `disabled`);

    this.createNewData();
    this._newComment = createElement(createCommentTemplate(newComment));

    commentList.append(this._newComment);

    this._clearInput();
  }

  validateInput() {
    this.getElement().querySelector(`.film-details__comment-input`).style.border = BORDER;
    setTimeout(() => {
      this.getElement().querySelector(`.film-details__comment-input`).style.border = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  validateEmoji() {
    this.getElement().querySelector(`.film-details__add-emoji-label`).style.border = BORDER;
    setTimeout(() => {
      this.getElement().querySelector(`.film-details__add-emoji-label`).style.border = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  errorSendHandler() {
    const input = this.getElement().querySelector(`.film-details__comment-input`);
    input.removeAttribute(`disabled`);

    const newCommentBlock = this.getElement().querySelector(`.film-details__new-comment`);
    newCommentBlock.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / SHAKE_LENGTH}s`;

    newCommentBlock.querySelector(`.film-details__comment-input`).style.border = BORDER;

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

  deleteHandler(evt) {
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

  _emojiChangeHandler(label) {
    this._emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    const labelId = label.getAttribute(`for`);

    this._emojiRadio = this.getElement().querySelector(`input[id="${labelId}"]`);
    this._emojiRadio.setAttribute(`checked`, `checked`);

    this._emoji = this.getElement().querySelector(`input[id="${labelId}"]`).getAttribute(`value`);

    const emojiImage = label.querySelector(`img`).cloneNode(true);
    emojiImage.setAttribute(`height`, EMOJI_SIZE);
    emojiImage.setAttribute(`width`, EMOJI_SIZE);

    if (!this._isEmoji) {
      this._emojiContainer.appendChild(emojiImage);
      this._isEmoji = true;
    } else {
      this._emojiContainer.removeChild(this._emojiContainer.querySelector(`img`));
      this._emojiContainer.appendChild(emojiImage);
    }
  }

  _changeHandler() {
    const commentText = encode(this.getElement().querySelector(`.film-details__comment-input`).value);
    return commentText;
  }

  _clearInput() {
    this._emojiContainer.removeChild(this._emojiContainer.querySelector(`img`));
    this._emojiRadio.removeAttribute(`checked`);
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
    this._isEmoji = false;
  }

  _ctrlEnterEventHandler(evt) {
    const enterKey = evt.key === `Enter`;

    if (evt.ctrlKey && enterKey) {
      this.addComment();
    }
  }
}
