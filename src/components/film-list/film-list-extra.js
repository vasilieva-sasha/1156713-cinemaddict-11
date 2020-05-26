import {createExtraFilmsContainer} from "./components/extra-film-lists";
import AbstractSmartComponent from "../abstract-smart-component";

export default class FilmListExtra extends AbstractSmartComponent {
  constructor(heading) {
    super();
    this._element = null;
    this._heading = heading;
  }

  getTemplate() {
    return createExtraFilmsContainer(this._heading);
  }

  hide() {
    super.hide();
  }

  show() {
    super.show();
  }
}
