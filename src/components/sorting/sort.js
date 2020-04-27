import AbstractComponent from "../abstract-component";
import {createSortingTemplate} from "./components/sort";

export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSortingTemplate();
  }
}
