import {createButtonShowTemplate} from "../../button-show/components/button-show";
import {createExtraFilmsContainer} from "./extra-film-lists";

const topRatedHeading = `Top rated`;
const mostCommentedHeading = `Most commented`;

const createMainContentTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export {createMainContentTemplate};

{/* <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
        ${createButtonShowTemplate()}
      </section>
      ${createExtraFilmsContainer(topRatedHeading)}
      ${createExtraFilmsContainer(mostCommentedHeading)} */}
