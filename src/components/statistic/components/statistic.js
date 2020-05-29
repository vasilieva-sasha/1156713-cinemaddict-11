import {STATISTIC_FILTER} from "../../../consts/consts";
import {getFilmDuration} from "../../../tools/utils/utils";

const isFilterChecked = (input) => input === `all-time` ? `checked` : ``;
const createStatisticsInputTemplate = ({name, input, period}) => {
  return (
    `<input type="radio" data-filter-type="${period}" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${input}" value="${input}" ${isFilterChecked(input)}>
    <label for="statistic-${input}" class="statistic__filters-label">${name}</label>`
  );
};

const showRank = (filmCount, filmsModel) => filmCount > 0 ?
  `<p class="statistic__rank">
  Your rank
  <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  <span class="statistic__rank-label">${filmsModel.getProfileRange()}</span>
  </p>` : ``;

const createStatisticFilterList = () => {
  return STATISTIC_FILTER.map(createStatisticsInputTemplate).join(`\n`);
};

const createStatisticTemplate = (filmsModel, {filmCount, hoursCount, genre}) => {
  return (
    `<section class="statistic">
      ${showRank(filmCount, filmsModel)}

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${createStatisticFilterList()}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${filmCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${getFilmDuration(hoursCount)}</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${genre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export {createStatisticTemplate};
