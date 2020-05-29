import MovieController from "../controllers/movie-controller";

const renderCards = (films, container, dataChangeHandler, viewChangeHandler, api, cardControlChangeHandler) => {
  return films.map((film) => {
    const movieController = new MovieController(container, dataChangeHandler, viewChangeHandler, api, cardControlChangeHandler);
    movieController.render(film);

    return movieController;
  });
};

export {renderCards};
