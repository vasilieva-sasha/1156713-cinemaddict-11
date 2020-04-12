import {filmCardsList} from "./../tools/render-cards.js";

export const createExtraFilmsContainer = (heading) => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">${heading}</h2>
      <div class="films-list__container">
      </div>
    </section>`);
};

export const topRatedList = filmCardsList.slice().sort((a, b) => {
  return b.filmRate - a.filmRate;
});

export const mostComentedList = filmCardsList.slice().sort((a, b) => {
  return b.filmComments.length - a.filmComments.length;
});
