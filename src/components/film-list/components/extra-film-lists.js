import {filmCardsList} from "../../../tools/render-cards";

const createExtraFilmsContainer = (heading) => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">${heading}</h2>
      <div class="films-list__container">
      </div>
    </section>`);
};

const topRatedList = [...filmCardsList].slice().sort((first, second) => {
  return second.ageRate - first.ageRate;
});

const mostComentedList = [...filmCardsList].slice().sort((first, second) => {
  return second.comments.length - first.comments.length;
});

export {createExtraFilmsContainer, topRatedList, mostComentedList};
