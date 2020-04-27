import {createMainContentTemplate} from "./components/films-container";
import AbstractComponent from "../abstract-component";

export default class FilmContainer extends AbstractComponent {
  getTemplate() {
    return createMainContentTemplate(this._element);
  }
}
