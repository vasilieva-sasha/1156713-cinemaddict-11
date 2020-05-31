export const AUTHORIZATION = `Basic aaafh6h9gm56vjckxg`;
export const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export const SHOW_CARD_AMOUNT = 5;
export const SHOW_EXTRA_CARD_AMOUNT = 2;
export const EMOJI_SIZE = 55;

export const Heading = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

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

export const TextLength = {
  MAX: 140,
  MIN: 139,
};

export const MINUTES_IN_HOUR = 60;

export const ProfileRank = {
  NOVICE: {
    rank: `Novice`,
    from: 1,
  },
  FUN: {
    rank: `Fan`,
    from: 11
  },
  MOVIE_BUFF: {
    rank: `Movie Buff`,
    from: 21
  }
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

export const DEFAULT_FILTER_TYPE = `all`;

export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

export const DEFAULT_FILTER_TYPE_STATS = `all time`;

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

export const BORDER = `2px solid red`;

export const BAR_HEIGHT = 50;
