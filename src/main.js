import HeaderProfile from "./components/header/header-pofile";
import Sort from "./components/sorting/sort";
import Navigation from "./components/navigation/navigation";
import {render} from "./tools/utils/render";
import {Position} from "./consts/consts";
import {renderFilmContainer} from "./components/film-list/render-film-container";
import FooterStatisticsMarkup from "./components/footer/footer-statistics";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`footer`);

const init = () => {
  const headerProfileComponent = new HeaderProfile();
  const sortingComponent = new Sort();
  const navigationComponent = new Navigation();
  const statisticsComponent = new FooterStatisticsMarkup();

  render(header, headerProfileComponent, Position.BEFOREEND);
  render(main, navigationComponent, Position.BEFOREEND);
  render(main, sortingComponent, Position.BEFOREEND);

  renderFilmContainer();

  render(footer, statisticsComponent, Position.BEFOREEND);

};

init();
