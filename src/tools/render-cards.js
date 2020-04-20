import {createCardTemplate} from "./../components/film-card/components/film-card";
import {generateFilmCardsArray} from "./../mock/film-card";
import {render} from "./utils";
import {CARD_AMOUNT, Position} from "../consts/consts";
import FilmCard from "../components/film-card/film-card";
import { showPopup } from "../components/popup/show-popup";
import Popup from "../components/popup/popup";

const filmCardsList = generateFilmCardsArray(CARD_AMOUNT);

const renderCard = (container, card) => {
  const filmCardComponent = new FilmCard(card);
  const popupComponent = new Popup(card);
  render(container, filmCardComponent.getElement(), Position.BEFOREEND);

  showPopup(filmCardComponent.getElement(), popupComponent);
};

const renderCards = (array, start, amount, container) => {
  for (let i = start; i < amount; i++) {
    renderCard(container, array[i]);
  }
};

export {filmCardsList, renderCards};
