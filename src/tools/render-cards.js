import MovieController from "../controllers/movie-controller";

const renderCards = (films, container, onDataChange, onViewChange, api) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange, api);
    movieController.render(film);

    return movieController;
  });
};

export {renderCards};
