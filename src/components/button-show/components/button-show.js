import {SHOW_CARD_AMOUNT, CARD_AMOUNT} from "../../../consts/consts";
import {filmCardsList, renderCards} from "../../../tools/render-cards";
import {remove} from "../../../tools/utils/render";

const createButtonShowTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

let cardsCount = SHOW_CARD_AMOUNT;

const onButtonShowClick = (container, button) => {
  let prevCardsCount = cardsCount;

  cardsCount = (filmCardsList.length - cardsCount) > SHOW_CARD_AMOUNT ?
    prevCardsCount + SHOW_CARD_AMOUNT :
    CARD_AMOUNT;

  renderCards(filmCardsList, prevCardsCount, cardsCount, container);

  if (cardsCount >= filmCardsList.length) {
    remove(button);
  }
};

export {createButtonShowTemplate, onButtonShowClick};
