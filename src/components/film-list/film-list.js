import AbstractComponent from "../abstract-component";
import {createFilmListTemplate} from "./components/film-list";

export default class FilmList extends AbstractComponent {
  getTemplate() {
    return createFilmListTemplate(this._element);
  }
}
