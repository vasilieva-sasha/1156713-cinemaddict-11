export const SHOW_CARD_AMOUNT = 5;
export const SHOW_EXTRA_CARD_AMOUNT = 2;
export const EMOJI_SIZE = 55;

export const Position = {
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`,
};

export const Class = {
  HEADER: document.querySelector(`.header`),
  MAIN: document.querySelector(`.main`),
  FOOTER: document.querySelector(`footer`),
};

export const FormatDate = {
  COMMENT_DATE: `YYYY/MM/DD HH:MM`,
  RELEASE_YEAR: `YYYY`,
  RELEASE_DATE: `DD MMMM YYYY`
};

export const SortType = {
  DATE: `date`,
  RATE: `rate`,
  DEFAULT: `default`,
};

export const ControlType = {
  WATCHLIST: `inWatchlist`,
  HISTORY: `inHistory`,
  FAVORITES: `inFavorites`,
};

export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

export const STATISTIC_FILTER = [
  {
    name: `All time`,
    input: `all-time`,
    period: `all-time`
  },
  {
    name: `Today`,
    input: `today`,
    period: `day`
  },
  {
    name: `Week`,
    input: `week`,
    period: `week`
  },
  {
    name: `Month`,
    input: `month`,
    period: `month`
  },
  {
    name: `Year`,
    input: `year`,
    period: `year`
  },

];


export const Mode = {
  DEFAULT: `default`,
  OPEN: `open`,
};
