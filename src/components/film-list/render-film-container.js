import FilmList from "./film-list"
import {render} from "../../tools/utils";
import FilmCard from "../film-card/film-card";
import {Position, SHOW_CARD_AMOUNT} from "../../consts/consts";
import FilmContainer from "./film-container";
import ButtonShow from "../button-show/button-show";
import {renderCards, filmCardsList} from "../../tools/render-cards";

const renderFilmContainer = () => {
  const main = document.querySelector(`.main`);
  const filmContainerComponent = new FilmContainer();
  const filmListComponent = new FilmList();
  const buttonShowComponent = new ButtonShow();

  render(main, filmContainerComponent.getElement(), Position.BEFOREEND);
  render(filmContainerComponent.getElement(), filmListComponent.getElement(), Position.BEFOREEND);
  render(filmListComponent.getElement(), buttonShowComponent.getElement(), Position.BEFOREEND);

  const filmListContainer = filmListComponent.getElement().querySelector(`.films-list__container`);

  renderCards(filmCardsList, 0, SHOW_CARD_AMOUNT, filmListContainer);

};

export {renderFilmContainer};
