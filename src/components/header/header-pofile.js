import {createHeaderProfileTemplate} from "./components/header-profile";
import AbstractComponent from "../abstract-component";

export default class HeaderProfile extends AbstractComponent {
  getTemplate() {
    return createHeaderProfileTemplate();
  }
}
