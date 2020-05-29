import {createFilmsContainerTemplate} from "./components/films-container";
import AbstractComponent from "../abstract-component";

export default class FilmContainer extends AbstractComponent {
  getTemplate() {
    return createFilmsContainerTemplate(this._element);
  }
}
