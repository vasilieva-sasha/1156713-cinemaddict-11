import {createLoadingMessageMarkup} from "./components/loading-message";
import AbstractComponent from "../abstract-component";

export default class LoadingMessage extends AbstractComponent {
  getTemplate() {
    return createLoadingMessageMarkup();
  }
}
