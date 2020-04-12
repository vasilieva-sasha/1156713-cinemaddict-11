import {createCardTemplate} from "./../components/film-card.js";
import {generateFilmCardsArray} from "./../mock/film-card.js";
import {render} from "./utils.js";
import {CARD_AMOUNT, Position} from "./consts";

export const filmCardsList = generateFilmCardsArray(CARD_AMOUNT);

export const renderCards = (array, start, amount, container) => {
  array.slice(start, amount)
  .forEach((card) => {
    render(container, createCardTemplate(card), Position.BEFOREEND);
  });
};

