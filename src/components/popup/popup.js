import {createPopupTemplate} from "./components/popup";
import AbstractSmartComponent from "../abstract-smart-component";
import Comments from "./comments";
import {Mode, DISPLAY_NONE} from "../../consts/consts";

export default class Popup extends AbstractSmartComponent {
  constructor(card, api, dataChangeHandler, movieController) {
    super();
    this._card = card;
    this._api = api;
    this._movieController = movieController;

    this._mode = Mode.OPEN;
    this._closeHandler = null;
    this._controlsChangeHandler = null;
    this._dataChangeHandler = dataChangeHandler;
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  recoveryListeners() {
    this.setCloseHandler(this._closeHandler);
    this.setControlsChangeHandler(this._controlsChangeHandler);
  }

  rerender() {
    super.rerender();
  }

  setCloseHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._isEmoji = false;

    this._closeHandler = handler;
  }

  setControlsChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName !== `LABEL`) {
          return;
        }
        const controlType = evt.target.dataset.controlType;

        handler(controlType);
      });

    this._controlsChangeHandler = handler;
  }

  getComments() {
    this._api.getComments(this._card.id)
      .then((comments) => {
        this._card.commentsList = comments;
        this._commentsListComponent = new Comments(this._card, this._dataChangeHandler, this._api, this._movieController);
        this.getElement().querySelector(`.form-details__bottom-container`).append(this._commentsListComponent.getElement());
        this._commentsListComponent.setEmojiChangeHandler();

        this._commentsListComponent.setDeleteHandler((evt) => {
          this._commentsListComponent.deleteHandler(evt);
        });
      })
      .then(() => {
        this._commentsListComponent.setSendCommentHandler();
      })
      .catch(() => {
        this.getElement().querySelector(`.form-details__bottom-container`).style = DISPLAY_NONE;
      });
  }
}
