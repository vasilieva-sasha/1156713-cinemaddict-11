import FilmList from "../components/film-list/film-list";
import ButtonShow from "../components/button-show/button-show";
import FilmListExtra from "../components/film-list/film-list-extra";
import NoFilmMessage from "../components/messages/no-films";
import {render} from "../tools/utils/render";
import {CARD_AMOUNT, Position, SHOW_CARD_AMOUNT, SHOW_EXTRA_CARD_AMOUNT} from "../consts/consts";
import {renderCards, filmCardsList} from "../tools/render-cards";
import {onButtonShowClick} from "../components/button-show/components/button-show";
import {topRatedList, mostComentedList} from "../components/film-list/components/extra-film-lists";

const topRatedHeading = `Top rated`;
const mostCommentedHeading = `Most commented`;

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmListComponent = new FilmList();
    this._buttonShowComponent = new ButtonShow();
    this._topRatedComponent = new FilmListExtra(topRatedHeading);
    this._mostComentedComponent = new FilmListExtra(mostCommentedHeading);
    this._noFilmComponent = new NoFilmMessage();
  }

  renderFilmList(container) {
    render(container, this._filmListComponent, Position.BEFOREEND);

    const filmListContainer = this._filmListComponent.getElement().querySelector(`.films-list__container`);

    renderCards(filmCardsList, 0, SHOW_CARD_AMOUNT, filmListContainer);

    this._buttonShowComponent.setButtonClick(() => {
      onButtonShowClick(filmListContainer, this._buttonShowComponent);
    });
  }

  renderExtraFilmLists(container) {
    render(container, this._topRatedComponent, Position.BEFOREEND);
    render(container, this._mostComentedComponent, Position.BEFOREEND);

    const topRatedContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
    const mostComentedContainer = this._mostComentedComponent.getElement().querySelector(`.films-list__container`);


    renderCards(topRatedList, 0, SHOW_EXTRA_CARD_AMOUNT, topRatedContainer);
    renderCards(mostComentedList, 0, SHOW_EXTRA_CARD_AMOUNT, mostComentedContainer);
  }

  render() {
    const container = this._container.getElement();

    if (CARD_AMOUNT === 0) {
      render(container, this._noFilmComponent, Position.AFTERBEGIN);
      return;
    }

    render(this._filmListComponent.getElement(), this._buttonShowComponent, Position.BEFOREEND);
    this.renderFilmList(container);
    this.renderExtraFilmLists(container);
  }
}
