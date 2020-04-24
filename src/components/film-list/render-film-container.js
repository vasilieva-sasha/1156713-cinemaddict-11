import FilmList from "./film-list";
import FilmListExtra from "./film-list-extra";
import FilmContainer from "./film-container";
import ButtonShow from "../button-show/button-show";
import {render} from "../../tools/utils/render";
import {Position, CARD_AMOUNT, SHOW_CARD_AMOUNT, SHOW_EXTRA_CARD_AMOUNT} from "../../consts/consts";
import {onButtonShowClick} from "./../button-show/components/button-show";
import {renderCards, filmCardsList} from "../../tools/render-cards";
import {topRatedList, mostComentedList} from "./components/extra-film-lists";
import NoFilmMessage from "../messages/no-films";

const renderFilmContainer = () => {
  const topRatedHeading = `Top rated`;
  const mostCommentedHeading = `Most commented`;

  const main = document.querySelector(`.main`);
  const filmContainerComponent = new FilmContainer();

  render(main, filmContainerComponent, Position.BEFOREEND);

  if (CARD_AMOUNT === 0) {
    render(filmContainerComponent.getElement(), new NoFilmMessage(), Position.AFTERBEGIN);
    return;
  }

  const filmListComponent = new FilmList();
  const buttonShowComponent = new ButtonShow();
  const topRatedComponent = new FilmListExtra(topRatedHeading);
  const mostComentedComponent = new FilmListExtra(mostCommentedHeading);

  render(filmContainerComponent.getElement(), filmListComponent, Position.BEFOREEND);
  render(filmListComponent.getElement(), buttonShowComponent, Position.BEFOREEND);
  render(filmContainerComponent.getElement(), topRatedComponent, Position.BEFOREEND);
  render(filmContainerComponent.getElement(), mostComentedComponent, Position.BEFOREEND);

  const filmListContainer = filmListComponent.getElement().querySelector(`.films-list__container`);
  const topRatedContainer = topRatedComponent.getElement().querySelector(`.films-list__container`);
  const mostComentedContainer = mostComentedComponent.getElement().querySelector(`.films-list__container`);

  renderCards(filmCardsList, 0, SHOW_CARD_AMOUNT, filmListContainer);
  renderCards(topRatedList, 0, SHOW_EXTRA_CARD_AMOUNT, topRatedContainer);
  renderCards(mostComentedList, 0, SHOW_EXTRA_CARD_AMOUNT, mostComentedContainer);

  buttonShowComponent.setButtonClick(() => {
    onButtonShowClick(filmListContainer, buttonShowComponent);
  });
};

export {renderFilmContainer};
