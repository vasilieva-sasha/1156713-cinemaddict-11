import {createCardTemplate} from "./../components/film-card/components/film-card";
import {generateFilmCardsArray} from "./../mock/film-card";
import {render} from "./utils";
import {CARD_AMOUNT, Position} from "../consts/consts";
import FilmCard from "../components/film-card/film-card";
import { showPopup } from "../components/popup/show-popup";

const filmCardsList = generateFilmCardsArray(CARD_AMOUNT);

const renderCard = (container, card, i) => {
  const filmCardComponent = new FilmCard(card);
  render(container, filmCardComponent.getElement(), Position.BEFOREEND);

  showPopup(filmCardComponent.getElement(), i);
};

const renderCards = (array, start, amount, container) => {
  for (let i = start; i < amount; i++) {
    renderCard(container, array[i], i);
  }
};

export {filmCardsList, renderCards};
