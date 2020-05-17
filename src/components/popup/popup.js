import {createPopupTemplate} from "./components/popup";
import AbstractSmartComponent from "../abstract-smart-component";
import {EMOJI_SIZE, NAMES} from "../../consts/consts";
import Comment from "./comments";
import {getCommentDate, getRandomElement} from "../../tools/utils/utils";

export default class Popup extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._newComment = null;
    this.newComments = null;

    this._isEmoji = false;
    this._emoji = null;
    this._emojiContainer = null;
    this._emojiRadio = null;

    this._popupClose = null;
    this._onControlsChange = null;
    this._onControlChange = this._onControlChange.bind(this);
    this._onEmojiChange = this._onEmojiChange.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  recoveryListeners() {
    this.setPopupClose(this._popupClose);
    this.setControlsChangeHandler(this._onControlsChange);
    this.setEmojiChangeHandler();
  }

  setPopupClose(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._isEmoji = false;

    this._popupClose = handler;
  }

  setControlsChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`click`, (evt) => {
        const controlType = evt.target.dataset.controlType;
        handler(controlType);
      });

    this._onControlsChange = handler;
  }

  setEmojiChangeHandler() {
    this.getElement().querySelectorAll(`.film-details__emoji-label`)
      .forEach((label) => {
        label.addEventListener(`click`, () => {
          this._onEmojiChange(label);
        });
      });
  }

  addComment(handler) {
    const commentList = this.getElement().querySelector(`.film-details__comments-list`);
    const newCommentObject = {
      text: this._onCommentChange(),
      name: getRandomElement(NAMES),
      date: getCommentDate(new Date()),
      emoji: this._emoji,
    };
    this.newComments = this._card.comments.concat(newCommentObject);

    this._newComment = new Comment(newCommentObject).getElement();
    commentList.append(this._newComment);
    this._clearInput();
    handler();
  }

  _onControlChange(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `LABEL`) {
      return;
    }
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
    const commentText = this.getElement().querySelector(`.film-details__comment-input`).value;
    return commentText;
  }

  // наверное убрать
  _clearInput() {
    this._emojiContainer.removeChild(this._emojiContainer.querySelector(`img`));
    this._emojiRadio.removeAttribute(`checked`);
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
    this._isEmoji = false;
  }
}
