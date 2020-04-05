import {createCardTemplate} from "./../components/film-card.js";
import {render} from "./utils.js";
import {Position} from "./consts";

export const renderCards = (amount, container) => {
  for (let i = 0; i < amount; i++) {
    render(container, createCardTemplate(), Position.BEFOREEND);
  }
};
