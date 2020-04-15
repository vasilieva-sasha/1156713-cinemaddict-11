import {createCardTemplate} from "./../components/film-card";
import {generateFilmCardsArray} from "./../mock/film-card";
import {render} from "./utils";
import {CARD_AMOUNT, Position} from "../consts/consts";

const filmCardsList = generateFilmCardsArray(CARD_AMOUNT);

const renderCards = (array, start, amount, container) => {
  for (let i = start; i < amount; i++) {
    render(container, createCardTemplate(array[i]), Position.BEFOREEND);
  }
};

export {filmCardsList, renderCards};
