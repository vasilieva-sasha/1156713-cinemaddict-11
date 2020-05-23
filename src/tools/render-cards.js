import MovieController from "../controllers/movie-controller";

const renderCards = (films, container, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

export {renderCards};
