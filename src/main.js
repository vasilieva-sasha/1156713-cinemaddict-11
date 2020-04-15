import {createHeaderProfileTemplate} from "./components/header-profile";
import {createSiteNavigationTemplate} from "./components/navigation";
import {createSortingTemplate} from "./components/sorting";
import {createMainContentTemplate} from "./components/films-container";
import {render} from "./tools/utils";
import {SHOW_CARD_AMOUNT, SHOW_EXTRA_CARD_AMOUNT, Position} from "./consts/consts";
import {filmCardsList, renderCards} from "./tools/render-cards";
import {showFilms} from "./components/button-show";
import {topRatedList, mostComentedList} from "./components/extra-film-lists";
import {showPopup} from "./components/popup/show-popup";

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

  filmCards.forEach(showPopup);

  showFilms(filmListElement);
};

init();
