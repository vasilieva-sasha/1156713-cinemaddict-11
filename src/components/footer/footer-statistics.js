import {createFooterStatisticsMarkup} from "./components/footer-statistics";
import AbstractComponent from "../abstract-component";

export default class FooterStatistics extends AbstractComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
  }

  getTemplate() {
    return createFooterStatisticsMarkup(this._filmsModel);
  }
}
