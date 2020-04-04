import {createHeaderProfileTemplate} from "./components/header-profile.js";
import {createSiteNavigationTemplate} from "./components/navigation.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createMainContentTemplate} from "./components/films-container.js";
import {createPopupTemplate} from "./components/popup.js";
import {render} from "./tools/utils.js";
import {CARD_AMOUNT, EXTRA_CARD_AMOUNT, Position} from "./tools/consts";
import {renderCards} from "./tools/render-cards.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

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

  render(footer, createPopupTemplate(), Position.AFTEREND);
  const popup = document.querySelector(`.film-details`);
  popup.classList.add(`visually-hidden`);
};

init();
