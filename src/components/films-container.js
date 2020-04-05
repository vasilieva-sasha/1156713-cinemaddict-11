import {createButtonShowTemplate} from "./button-show.js";
import {createExtraFilmsContainer} from "./extra-film-lists.js";

const topRatedHeading = `Top rated`;
const mostCommentedHeading = `Most commented`;

export const createMainContentTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
        ${createButtonShowTemplate()}
      </section>
      ${createExtraFilmsContainer(topRatedHeading)}
      ${createExtraFilmsContainer(mostCommentedHeading)}
    </section>`
  );
};
