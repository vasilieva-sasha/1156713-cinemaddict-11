const createFooterStatisticsMarkup = (filmsModel) => {
  return (
    `<section class="footer__statistics">
      <p>${filmsModel.getFilms().length} movies inside</p>
    </section>`
  );
};

export {createFooterStatisticsMarkup};
