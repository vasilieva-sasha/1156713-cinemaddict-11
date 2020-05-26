import {render} from "./tools/utils/render";
import {Position, Class} from "./consts/consts";
import FooterStatisticsMarkup from "./components/footer/footer-statistics";
import PageController from "./controllers/page-controller";
import FilmContainer from "./components/film-list/film-container";
import Movies from "./models/movies";
import FilterController from "./controllers/filter";
import API from "./api/api";


const init = () => {
  const AUTHORIZATION = `Basic ghfghgggjgm56vjckxg`;
  const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
  const api = new API(END_POINT, AUTHORIZATION);

  const filmsModel = new Movies();

  const footerStatisticsComponent = new FooterStatisticsMarkup();
  const filmContainerComponent = new FilmContainer();

  const filterController = new FilterController(Class.MAIN, filmsModel);
  filterController.render();

  render(Class.MAIN, filmContainerComponent, Position.BEFOREEND);

  const pageController = new PageController(filmContainerComponent, filmsModel, api);
  api.getFilms()
  .then((data) => {
    filmsModel.setFilms(data);
    pageController.render();
  });

  filterController.setStatisticHandler(() => {
    pageController.showStatistics();
  });

  filterController.setFilterChangeHandler((filterType) => {
    filterController.activeFilterType = filterType;
    pageController.showMainPage();
    filmsModel.setFilter(filterType);
  });

  render(Class.FOOTER, footerStatisticsComponent, Position.BEFOREEND);
};

init();
