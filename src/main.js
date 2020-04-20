import {createHeaderProfileTemplate} from "./components/header/components/header-profile";
import {createSiteNavigationTemplate} from "./components/navigation/components/navigation";
import {createSortingTemplate} from "./components/sorting/components/sort";
import {createMainContentTemplate} from "./components/film-list/components/films-container";
import {render} from "./tools/utils";
import {SHOW_CARD_AMOUNT, SHOW_EXTRA_CARD_AMOUNT, Position} from "./consts/consts";
import {filmCardsList, renderCards} from "./tools/render-cards";
import {showFilms} from "./components/button-show/components/button-show";
import {topRatedList, mostComentedList} from "./components/film-list/components/extra-film-lists";
import {showPopup} from "./components/popup/show-popup";
import {renderFilmContainer} from "./components/film-list/render-film-container";
import HeaderProfile from "./components/header/header-pofile";
import Sort from "./components/sorting/sort";
import Navigation from "./components/navigation/navigation";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const init = () => {
  const headerProfileComponent = new HeaderProfile();
  const sortingComponent = new Sort();
  const navigationComponent = new Navigation();
  render(header, headerProfileComponent.getElement(), Position.BEFOREEND);
  render(main, navigationComponent.getElement(), Position.BEFOREEND);
  render(main, sortingComponent.getElement(), Position.BEFOREEND);
  // render(main, createMainContentTemplate(), Position.BEFOREEND);

  // const filmListContainer = document.querySelector(`.films-list`);
  // const filmListElement = filmListContainer.querySelector(`.films-list__container`);
  // const filmListsExtraContainers = document.querySelectorAll(`.films-list--extra`);
  renderFilmContainer();

  // renderCards(filmCardsList, 0, SHOW_CARD_AMOUNT, filmListElement);

  // const topRatedListContainer = filmListsExtraContainers[0].querySelector(`.films-list__container`);
  // const mostCommentedListContainer = filmListsExtraContainers[1].querySelector(`.films-list__container`);

  // renderCards(topRatedList, 0, SHOW_EXTRA_CARD_AMOUNT, topRatedListContainer);
  // renderCards(mostComentedList, 0, SHOW_EXTRA_CARD_AMOUNT, mostCommentedListContainer);


  // const filmCards = document.querySelectorAll(`.film-card`);

  // filmCards.forEach(showPopup);

  // showFilms(filmListElement);
};

init();
