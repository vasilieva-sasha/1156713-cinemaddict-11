import {createNoFilmsMessageMarkup} from "./components/no-data-message";
import AbstractComponent from "../abstract-component";

export default class NoFilmMessage extends AbstractComponent {
  getTemplate() {
    return createNoFilmsMessageMarkup();
  }
}
