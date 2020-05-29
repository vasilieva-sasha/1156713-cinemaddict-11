import {render, remove} from "./tools/utils/render";
import {Position, Class} from "./consts/consts";
import FooterStatistics from "./components/footer/footer-statistics";
import PageController from "./controllers/page-controller";
import FilmContainer from "./components/film-list/film-container";
import Movies from "./models/movies";
import FilterController from "./controllers/filter";
import API from "./api/api";
import LoadingMessage from "./components/messages/loading-message";
import NoFilmMessage from "./components/messages/no-films-message";


const init = () => {
  const AUTHORIZATION = `Basic ghfgh6h9gm56vjckxg`;
  const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
  const api = new API(END_POINT, AUTHORIZATION);

  const filmsModel = new Movies();

  const footerStatisticsComponent = new FooterStatistics(filmsModel);
  const filmContainerComponent = new FilmContainer();

  const filterController = new FilterController(Class.MAIN, filmsModel);
  filterController.render();

  render(Class.MAIN, filmContainerComponent, Position.BEFOREEND);

  const loadingComponent = new LoadingMessage();
  render(Class.MAIN, loadingComponent, Position.BEFOREEND);

  const pageController = new PageController(filmContainerComponent, filmsModel, api);
  api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pageController.render();
    render(Class.FOOTER, footerStatisticsComponent, Position.BEFOREEND);
    remove(loadingComponent);
  })
  .catch(() => {
    remove(loadingComponent);
    render(Class.MAIN, new NoFilmMessage(), Position.BEFOREEND);
  });

  filterController.setStatisticHandler(() => {
    pageController.showStatistics();
  });

  filterController.setChangeHandler((filterType) => {
    filterController.activeFilterType = filterType;
    pageController.showMainPage();
    filmsModel.setFilter(filterType);
  });

};

init();
