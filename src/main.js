import HeaderProfile from "./components/header/header-pofile";
import {render} from "./tools/utils/render";
import {Position} from "./consts/consts";
import FooterStatisticsMarkup from "./components/footer/footer-statistics";
import PageController from "./controllers/page-controller";
import FilmContainer from "./components/film-list/film-container";
import Movies from "./models/movies";
import FilterController from "./controllers/filter";
import API from "./api/api";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`footer`);


const init = () => {
  const AUTHORIZATION = `Basic ghfghdkjgm56vjckxg`;
  const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
  const api = new API(END_POINT, AUTHORIZATION);

  const headerProfileComponent = new HeaderProfile();

  const statisticsComponent = new FooterStatisticsMarkup();
  const filmContainerComponent = new FilmContainer();
  const filmsModel = new Movies();

  const filterController = new FilterController(main, filmsModel);
  filterController.render();

  render(header, headerProfileComponent, Position.BEFOREEND);

  render(main, filmContainerComponent, Position.BEFOREEND);

  const pageController = new PageController(filmContainerComponent, filmsModel, api);
  api.getFilms()
  .then((data) => {
    filmsModel.setFilms(data);
    pageController.render();
  });

  render(footer, statisticsComponent, Position.BEFOREEND);
};

init();
