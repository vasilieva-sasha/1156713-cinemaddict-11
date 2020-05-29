import { FilterType } from "../../../consts/consts";

const createSiteNavigationTemplate = (filters) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createNavigationMarkup(filters)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const getActiveClass = (filter) => filter.checked ? `main-navigation__item--active` : ``;
const showAmount = (filter) => filter.name === FilterType.ALL ? `` : `<span class="main-navigation__item-count">${filter.count}</span>`;

const createNavigationItemMarkup = (filter) => {
  return (
    `<a href="#${filter.link}" data-filter-type="${filter.link}" class="main-navigation__item ${getActiveClass(filter)}">${filter.name}${showAmount(filter)}</a>`
  );
};

const createNavigationMarkup = (filters) => {
  return filters.map(createNavigationItemMarkup).join(`\n`);
};

let filteredFilms = [];

const getFilteredFilms = {
  'all': (cards) => {
    return cards;
  },
  'watchlist': (cards) => {
    filteredFilms = cards.slice().filter((card) => card.inWatchlist);
    return filteredFilms;
  },
  'history': (cards) => {
    filteredFilms = cards.slice().filter((card) => card.inHistory);
    return filteredFilms;
  },
  'favorites': (cards) => {
    filteredFilms = cards.slice().filter((card) => card.inFavorites);
    return filteredFilms;
  }
};

export {createSiteNavigationTemplate, getFilteredFilms};
