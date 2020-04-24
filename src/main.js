import HeaderProfile from "./components/header/header-pofile";
import Sort from "./components/sorting/sort";
import Navigation from "./components/navigation/navigation";
import {render} from "./tools/utils/render";
import {Position} from "./consts/consts";
import FooterStatisticsMarkup from "./components/footer/footer-statistics";
import PageController from "./controllers/page-controller";
import FilmContainer from "./components/film-list/film-container";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`footer`);

const init = () => {
  const headerProfileComponent = new HeaderProfile();
  const sortingComponent = new Sort();
  const navigationComponent = new Navigation();
  const statisticsComponent = new FooterStatisticsMarkup();
  const filmContainerComponent = new FilmContainer();

  render(header, headerProfileComponent, Position.BEFOREEND);
  render(main, navigationComponent, Position.BEFOREEND);
  render(main, sortingComponent, Position.BEFOREEND);

  render(main, filmContainerComponent, Position.BEFOREEND);

  const pageController = new PageController(filmContainerComponent);
  pageController.render();

  render(footer, statisticsComponent, Position.BEFOREEND);
};

init();
