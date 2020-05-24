import AbstractSmartComponent from "../abstract-smart-component";
import {createStatisticTemplate} from "./components/statistic";

export default class Statistic extends AbstractSmartComponent {
  constructor() {
    super();

  }

  getTemplate() {
    return createStatisticTemplate();
  }

  hide() {
    super.hide();
  }

  show() {
    super.show();
  }
}
