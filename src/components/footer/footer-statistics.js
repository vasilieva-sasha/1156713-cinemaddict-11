import {createFooterStatisticsMarkup} from "./components/footer-statistics";
import AbstractComponent from "../abstract-component";

export default class FooterStatistics extends AbstractComponent {
  getTemplate() {
    return createFooterStatisticsMarkup();
  }
}
