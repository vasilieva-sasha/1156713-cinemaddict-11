import {filmCardsList} from "./../tools/render-cards.js";
import {CARD_AMOUNT} from "../consts/consts.js";

let filtersResult = {
  inWatchlist: 0,
  inHistory: 0,
  inFavorites: 0
};

if (CARD_AMOUNT > 0) {
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
}

const filters = [
  {
    name: `All movies`,
    count: ``,
    isActive: true
  },
  {
    name: `Watchlist`,
    count: CARD_AMOUNT === 0 ? `0` : filtersResult.inWatchlist,
    isActive: false
  },
  {
    name: `History`,
    count: CARD_AMOUNT === 0 ? `0` : filtersResult.inHistory,
    isActive: false
  },
  {
    name: `Favorites`,
    count: CARD_AMOUNT === 0 ? `0` : filtersResult.inFavorites,
    isActive: false
  }
];

export {filters};
