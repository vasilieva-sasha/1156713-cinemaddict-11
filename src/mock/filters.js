import {filmCardsList} from "./../tools/render-cards.js";

const getWatchlistCount = () => {
  return filmCardsList.filter((card) => card.isInWatchlist)
  .length;
};

const getHistoryCount = () => {
  return filmCardsList.filter((card) => card.isInHistory)
  .length;
};

const getFavoriteCount = () => {
  return filmCardsList.filter((card) => card.isInFavorites)
  .length;
};

export const filters = [
  {
    name: `All movies`,
    count: ``,
    isActive: true
  },
  {
    name: `Watchlist`,
    count: getWatchlistCount(),
    isActive: false
  },
  {
    name: `History`,
    count: getHistoryCount(),
    isActive: false
  },
  {
    name: `Favorites`,
    count: getFavoriteCount(),
    isActive: false
  }
];
