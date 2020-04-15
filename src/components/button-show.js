import {SHOW_CARD_AMOUNT} from "../consts/consts";
import {filmCardsList, renderCards} from "../tools/render-cards";

const createButtonShowTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

let cardsCount = SHOW_CARD_AMOUNT;

const onButtonShowClick = (container, button) => {
  let prevCardsCount = cardsCount;
  cardsCount = prevCardsCount + SHOW_CARD_AMOUNT;

  renderCards(filmCardsList, prevCardsCount, cardsCount, container);

  if (cardsCount >= filmCardsList.length) {
    button.remove();
  }
};

const showFilms = (container) => {
  const buttonShow = document.querySelector(`.films-list__show-more`);

  buttonShow.addEventListener(`click`, () => {
    onButtonShowClick(container, buttonShow);
  });
};

export {createButtonShowTemplate, showFilms};
