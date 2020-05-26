import {createHeaderProfileTemplate} from "./components/header-profile";
import AbstractComponent from "../abstract-component";

export default class HeaderProfile extends AbstractComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._filmsModel);
  }
}
