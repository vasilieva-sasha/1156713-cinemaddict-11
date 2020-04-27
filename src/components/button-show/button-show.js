import {createButtonShowTemplate} from "./components/button-show";
import AbstractComponent from "../abstract-component";


export default class ButtonShow extends AbstractComponent {
  getTemplate() {
    return createButtonShowTemplate();
  }

  setButtonClick(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
