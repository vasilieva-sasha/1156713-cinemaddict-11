import {createHeaderProfileTemplate} from "./components/header-profile.js";
import {createSiteNavigationTemplate} from "./components/navigation.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createMainContentTemplate} from "./components/films-container.js";
import {render} from "./tools/utils.js";
import {CARD_AMOUNT, EXTRA_CARD_AMOUNT, Position} from "./tools/consts";
import {renderCards} from "./tools/render-cards.js";
import {generateFilmCardsArray} from "./mock/film-card.js";
import {onCardClick} from "./components/popup/render-popup.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const filmCardsList = generateFilmCardsArray(20);

const init = () => {
  render(header, createHeaderProfileTemplate(), Position.BEFOREEND);
  render(main, createSiteNavigationTemplate(), Position.BEFOREEND);
  render(main, createSortingTemplate(), Position.BEFOREEND);
  render(main, createMainContentTemplate(), Position.BEFOREEND);

  const filmListContainer = document.querySelector(`.films-list`);
  const filmListElement = filmListContainer.querySelector(`.films-list__container`);
  const filmListsExtraContainer = document.querySelectorAll(`.films-list--extra`);

  renderCards(CARD_AMOUNT, filmListElement);

  filmListsExtraContainer.forEach(function (container) {
    const filmListExtraElement = container.querySelector(`.films-list__container`);
    renderCards(EXTRA_CARD_AMOUNT, filmListExtraElement);
  });

  const filmCard = document.querySelectorAll(`.film-card`);

  for (let i = 0; i < filmCardsList.length; i++) {
    filmCard[i].addEventListener(`click`, function () {
      onCardClick(filmCardsList[i]);
    });
  }
};

init();
