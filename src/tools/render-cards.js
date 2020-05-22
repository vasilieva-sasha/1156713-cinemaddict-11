// import {generateFilmCardsArray} from "./../mock/film-card";
// import {CARD_AMOUNT} from "../consts/consts";
import MovieController from "../controllers/movie-controller";

// const filmCardsList = generateFilmCardsArray(CARD_AMOUNT);

const renderCards = (films, container, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

export {renderCards};
