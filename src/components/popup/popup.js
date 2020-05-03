import {createPopupTemplate} from "./components/popup";
import AbstractSmartComponent from "../abstract-smart-component";
import {EMOJI_SIZE} from "../../consts/consts";

export default class Popup extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._element = null;

    this._isEmoji = false;

    this._popupClose = null;
    this._controlsChangeHandler = null;
    // this._setEmojiChangeHandler = null;
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  recoveryListeners() {
    this.setPopupClose(this._popupClose);
    this.setControlsChangeHandler(this._controlsChangeHandler);
    this.setEmojiChangeHandler();
  }

  rerender() {
    super.rerender();
  }

  setPopupClose(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._popupClose = handler;
  }

  setControlsChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`click`, (evt) => {
        this._onControlChange.bind(this);
        const controlType = evt.target.dataset.controlType;
        handler(controlType);
      });
    this._controlsChangeHandler = handler;
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
    this.rerender();
  }

  _onEmojiChange(label) {
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    const labelId = label.getAttribute(`for`);

    this.getElement().querySelector(`input[id="${labelId}"]`).setAttribute(`checked`, `checked`);
    const emojiImage = label.querySelector(`img`).cloneNode(true);
    emojiImage.setAttribute(`height`, EMOJI_SIZE);
    emojiImage.setAttribute(`width`, EMOJI_SIZE);

    if (this._isEmoji === false) {
      emojiContainer.appendChild(emojiImage);
      this._isEmoji = true;
    } else {
      emojiContainer.removeChild(emojiContainer.querySelector(`img`));
      emojiContainer.appendChild(emojiImage);
    }
  }
}
