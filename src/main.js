import HeaderProfile from "./components/header/header-pofile";
import Sort from "./components/sorting/sort";
import Navigation from "./components/navigation/navigation";
import {render} from "./tools/utils";
import {Position} from "./consts/consts";
import {renderFilmContainer} from "./components/film-list/render-film-container";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const init = () => {
  const headerProfileComponent = new HeaderProfile();
  const sortingComponent = new Sort();
  const navigationComponent = new Navigation();

  render(header, headerProfileComponent.getElement(), Position.BEFOREEND);
  render(main, navigationComponent.getElement(), Position.BEFOREEND);
  render(main, sortingComponent.getElement(), Position.BEFOREEND);

  renderFilmContainer();

};

init();
