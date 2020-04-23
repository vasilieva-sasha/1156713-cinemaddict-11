import {createSiteNavigationTemplate} from "./components/navigation";
import AbstractComponent from "../abstract-component";

export default class Navigation extends AbstractComponent {
  getTemplate() {
    return createSiteNavigationTemplate();
  }
}
