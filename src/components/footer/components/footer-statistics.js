import {CARD_AMOUNT} from "../../../consts/consts";

const createFooterStatisticsMarkup = () => {
  return (
    `<section class="footer__statistics">
      <p>${CARD_AMOUNT} movies inside</p>
    </section>`
  );
};

export {createFooterStatisticsMarkup};
