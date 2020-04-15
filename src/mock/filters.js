import {filmCardsList} from "./../tools/render-cards.js";

let filtersResult = {
  inWatchlist: 0,
  inHistory: 0,
  inFavorites: 0
};

filmCardsList.reduce(({}, card) => {
  if (card.inWatchlist) {
    ++filtersResult.inWatchlist;
  } else if (card.inHistory) {
    ++filtersResult.inHistory;
  } else if (card.inFavorites) {
    ++filtersResult.inFavorites;
  }
  return filtersResult;
});

const filters = [
  {
    name: `All movies`,
    count: ``,
    isActive: true
  },
  {
    name: `Watchlist`,
    count: filtersResult.inWatchlist,
    isActive: false
  },
  {
    name: `History`,
    count: filtersResult.inHistory,
    isActive: false
  },
  {
    name: `Favorites`,
    count: filtersResult.inFavorites,
    isActive: false
  }
];

export {filters};
