import {SortType} from "../../../consts/consts";

const createSortingTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATE}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

let sortedFilms = [];

const getSortedFilms = {
  [SortType.DATE]: (cards, from, to) => {
    sortedFilms = cards.slice().sort((newerDate, olderDate) => olderDate.year - newerDate.year);
    return sortedFilms.slice(from, to);
  },
  [SortType.RATE]: (cards, from, to) => {
    sortedFilms = cards.slice().sort((lowerRate, higherRate) => higherRate.rate - lowerRate.rate);
    return sortedFilms.slice(from, to);
  },
  [SortType.DEFAULT]: (cards, from, to) => {
    sortedFilms = cards.slice();
    return sortedFilms.slice(from, to);
  },

};

export {createSortingTemplate, getSortedFilms};
