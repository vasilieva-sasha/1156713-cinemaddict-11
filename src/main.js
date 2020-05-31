import {render, remove} from "./tools/utils/render";
import {END_POINT, AUTHORIZATION, STORE_NAME, Position, Class} from "./consts/consts";
import FooterStatistics from "./components/footer/footer-statistics";
import PageController from "./controllers/page-controller";
import FilmContainer from "./components/film-list/film-container";
import Movies from "./models/movies";
import FilterController from "./controllers/filter";
import API from "./api/index";
import Provider from "./api/provider";
import LoadingMessage from "./components/messages/loading-message";
import NoFilmMessage from "./components/messages/no-films-message";
import Store from "./api/store";


const init = () => {

  const api = new API(END_POINT, AUTHORIZATION);
  const store = new Store(STORE_NAME, window.localStorage);
  const apiWithProvider = new Provider(api, store);

  const filmsModel = new Movies();

  const footerStatisticsComponent = new FooterStatistics(filmsModel);
  const filmContainerComponent = new FilmContainer();

  const filterController = new FilterController(Class.MAIN, filmsModel);
  filterController.render();

  render(Class.MAIN, filmContainerComponent, Position.BEFOREEND);

  const loadingComponent = new LoadingMessage();
  render(Class.MAIN, loadingComponent, Position.BEFOREEND);

  const pageController = new PageController(filmContainerComponent, filmsModel, apiWithProvider);

  apiWithProvider.getFilms()
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

  window.addEventListener(`load`, () => {
    navigator.serviceWorker.register(`/sw.js`)
      .then(() => {
        // Действие, в случае успешной регистрации ServiceWorker
      }).catch(() => {
        // Действие, в случае ошибки при регистрации ServiceWorker
      });
  });

  window.addEventListener(`online`, () => {
    document.title = document.title.replace(` [offline]`, ``);

    apiWithProvider.sync();
  });

  window.addEventListener(`offline`, () => {
    document.title += ` [offline]`;
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
