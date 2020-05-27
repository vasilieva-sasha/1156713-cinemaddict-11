import {createPopupTemplate} from "./components/popup";
import AbstractSmartComponent from "../abstract-smart-component";
import Comments from "./comments";
import Comment from "../../models/comment";
import Movie from "../../models/movie";


export default class Popup extends AbstractSmartComponent {
  constructor(card, api, onDataChange, movieController) {
    super();
    this._card = card;
    this._api = api;
    this._movieController = movieController;

    this._popupClose = null;
    this._onControlsChange = null;
    this._onDataChange = onDataChange;
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
    this._api.getComments(this._card.id)
      .then((data) => {
        this._card.commentsList = data;
        this._commentsListComponent = new Comments(this._card.commentsList, this._onDataChange, this._api);
        this.getElement().querySelector(`.form-details__bottom-container`).append(this._commentsListComponent.getElement());
        this._commentsListComponent.setEmojiChangeHandler();

        this._commentsListComponent.setOnCommentDelete((evt) => {
          this._commentsListComponent.onCommentDelete(evt);
          this._onDataChange(this._movieController, this._card, this._card);
        });
      });
  }


  addComment() {
    const newCommentObject = this._commentsListComponent.createNewCommentObject();
    const newCommentModel = new Comment(newCommentObject);

    const newFilm = Movie.clone(this._card);

    this._api.createComment(newFilm.id, newCommentModel)
      .then((comments) => {
        const newCommentData = comments[comments.length - 1];
        newFilm.comments.push(newCommentData.id);
        newFilm.commentsList.push(newCommentData);
        this._commentsListComponent.addComment(newCommentModel);

        this._onDataChange(this._movieController, this._card, newFilm);
      })
      .catch(() => {
        this._commentsListComponent.errorSendHandler();
      });

  }

}
