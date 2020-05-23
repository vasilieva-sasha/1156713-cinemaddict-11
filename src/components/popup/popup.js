import {createPopupTemplate} from "./components/popup";
import AbstractSmartComponent from "../abstract-smart-component";
import API from "../../api/api";
import Comments from "./comments";

export default class Popup extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;


    this._popupClose = null;
    this._onControlsChange = null;
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  recoveryListeners() {
    this.setPopupClose(this._popupClose);
    this.setControlsChangeHandler(this._onControlsChange);
  }

  rerender() {
    super.rerender();
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
        evt.preventDefault();
        const controlType = evt.target.dataset.controlType;
        this.rerender();
        handler(controlType);
      });

    this._onControlsChange = handler;
  }

  getComments() {
    const AUTHORIZATION = `Basic ghfghdkjgm56vjckxg`;
    const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
    const api = new API(END_POINT, AUTHORIZATION);
    api.getComments(this._card.id)
      .then((data) => {
        this._commentsListComponent = new Comments(data);
        this.getElement().querySelector(`.form-details__bottom-container`).append(this._commentsListComponent.getElement());
        this._commentsListComponent.setEmojiChangeHandler();

        this._commentsListComponent.setOnCommentDelete(() => {
          this._onDataChange(this, this._card, Object.assign({}, this._card, {
            comments: this._commentsListComponent.newComments,
          }));
        });
      });
  }

}
