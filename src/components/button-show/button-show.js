import {createButtonShowTemplate} from "./components/button-show";
import AbstractSmartComponent from "../abstract-smart-component";


export default class ButtonShow extends AbstractSmartComponent {
  getTemplate() {
    return createButtonShowTemplate();
  }

  hide() {
    super.hide();
  }

  show() {
    super.show();
  }

  setButtonClick(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

}
