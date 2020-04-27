import AbstractComponent from "../abstract-component";
import {createExtraFilmsContainer} from "./components/extra-film-lists";

export default class FilmListExtra extends AbstractComponent {
  constructor(heading) {
    super();
    this._element = null;
    this._heading = heading;
  }

  getTemplate() {
    return createExtraFilmsContainer(this._heading);
  }
}
