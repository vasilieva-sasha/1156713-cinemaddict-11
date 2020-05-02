import {createPopupTemplate} from "./components/popup";
import AbstractSmartComponent from "../abstract-smart-component";
import {EMOJI_SIZE} from "../../consts/consts";

export default class Popup extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._element = null;

    this._isEmoji = false;

    this._setPopupClose = null;
    this._setControlsChangeHandler = null;
    this._setEmojiChangeHandler = null;
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  recoveryListeners() {
    this.setPopupClose(this._setPopupClose);
    this.setControlsChangeHandler(this._setControlsChangeHandler);
    this.setEmojiChangeHandler();
  }

  rerender() {
    super.rerender();
  }

  setPopupClose(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._setPopupClose = handler;
  }

  setControlsChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`click`, (evt) => {
        this._onControlChange(evt);
        handler();
      });
    this._setControlsChangeHandler = handler;
  }

  setEmojiChangeHandler() {
    this.getElement().querySelectorAll(`.film-details__emoji-label`)
      .forEach((label) => {
        label.addEventListener(`click`, () => {
          this._onEmojiChange(label);
        });
      });
  }

  _onControlChange(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    const controlType = evt.target.dataset.controlType;
    this._card[controlType] = !this._card[controlType];

    this.rerender();
  }

  _onEmojiChange(label) {
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    const labelId = label.getAttribute(`for`);

    this.getElement().querySelector(`input[id="${labelId}"]`).setAttribute(`checked`, `checked`);
    const emojiImage = label.querySelector(`img`).cloneNode(true);
    emojiImage.setAttribute(`height`, EMOJI_SIZE);
    emojiImage.setAttribute(`width`, EMOJI_SIZE);

    if (!this._isEmoji) {
      emojiContainer.append(emojiImage);
      this._isEmoji = true;
    } else {
      emojiContainer.querySelector(`img`).remove();
      emojiContainer.append(emojiImage);
    }
  }
}
