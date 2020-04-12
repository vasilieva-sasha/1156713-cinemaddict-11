import {createCardTemplate} from "./../components/film-card.js";
import {generateFilmCardsArray} from "./../mock/film-card.js";
import {render} from "./utils.js";
import {Position} from "./consts";

const filmCardsList = generateFilmCardsArray(20);

export const renderCards = (amount, container) => {
  filmCardsList.slice(0, 8)
  .forEach((card) => {
    render(container, createCardTemplate(card), Position.BEFOREEND);
  });
};

