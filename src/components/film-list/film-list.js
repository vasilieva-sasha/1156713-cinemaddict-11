import {createFilmListTemplate} from "./components/film-list";
import AbstractSmartComponent from "../abstract-smart-component";

export default class FilmList extends AbstractSmartComponent {
  getTemplate() {
    return createFilmListTemplate(this._element);
  }

  hide() {
    super.hide();
  }

  show() {
    super.show();
  }
}
