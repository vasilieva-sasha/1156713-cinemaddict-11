import FilmCard from "../components/film-card/film-card";
import Popup from "../components/popup/popup";
import {generateFilmCardsArray} from "./../mock/film-card";
import {render} from "./utils/render";
import {CARD_AMOUNT, Position} from "../consts/consts";
import {onCardClick} from "../components/popup/render-popup";

const filmCardsList = generateFilmCardsArray(CARD_AMOUNT);

const renderCard = (container, card) => {
  const filmCardComponent = new FilmCard(card);
  const popupComponent = new Popup(card);
  render(container, filmCardComponent, Position.BEFOREEND);

  filmCardComponent.setClickHandler(() => {
    onCardClick(popupComponent);
  });
};

const renderCards = (films, container) => {
  films.forEach((film) => renderCard(container, film));
};

export {filmCardsList, renderCards};
