import {createHeaderProfileTemplate} from "./components/header-profile.js";
import {createSiteNavigationTemplate} from "./components/navigation.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createMainContentTemplate} from "./components/films-container.js";
import {render} from "./tools/utils.js";
import {SHOW_CARD_AMOUNT, SHOW_EXTRA_CARD_AMOUNT, Position} from "./tools/consts";
import {filmCardsList, renderCards} from "./tools/render-cards.js";
import {onButtonShowClick} from "./components/button-show.js";
import {onCardClick} from "./components/popup/render-popup.js";
import {topRatedList, mostComentedList} from "./components/extra-film-lists.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const init = () => {
  render(header, createHeaderProfileTemplate(), Position.BEFOREEND);
  render(main, createSiteNavigationTemplate(), Position.BEFOREEND);
  render(main, createSortingTemplate(), Position.BEFOREEND);
  render(main, createMainContentTemplate(), Position.BEFOREEND);

  const filmListContainer = document.querySelector(`.films-list`);
  const filmListElement = filmListContainer.querySelector(`.films-list__container`);
  const filmListsExtraContainers = document.querySelectorAll(`.films-list--extra`);

  renderCards(filmCardsList, 0, SHOW_CARD_AMOUNT, filmListElement);

  const topRatedListContainer = filmListsExtraContainers[0].querySelector(`.films-list__container`);
  const mostCommentedListContainer = filmListsExtraContainers[1].querySelector(`.films-list__container`);

  renderCards(topRatedList, 0, SHOW_EXTRA_CARD_AMOUNT, topRatedListContainer);
  renderCards(mostComentedList, 0, SHOW_EXTRA_CARD_AMOUNT, mostCommentedListContainer);


  const filmCards = document.querySelectorAll(`.film-card`);

  filmCards.forEach((card, i) => {
    card.addEventListener(`click`, () => {
      onCardClick(filmCardsList[i]);
    });
  });

  const showButton = document.querySelector(`.films-list__show-more`);

  showButton.addEventListener(`click`, () => {
    onButtonShowClick(filmListElement, showButton);
  });
};

init();
