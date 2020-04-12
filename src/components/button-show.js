import {SHOW_CARD_AMOUNT} from "./../tools/consts.js";
import {filmCardsList, renderCards} from "./../tools/render-cards.js";

export const createButtonShowTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

let cardsCount = SHOW_CARD_AMOUNT;

export const onButtonShowClick = (container, button) => {
  let prevCardsCount = cardsCount;
  cardsCount = prevCardsCount + SHOW_CARD_AMOUNT;
  renderCards(filmCardsList, prevCardsCount, cardsCount, container);
  if (cardsCount >= filmCardsList.length) {
    button.remove();
  }
};
