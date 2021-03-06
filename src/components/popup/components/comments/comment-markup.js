import {getCommentDate} from "../../../../tools/utils/utils";

const createCommentTemplate = ({id, text, name, date, emoji}) => {
  return (
    `<li data-id="${id}" class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text[0].toUpperCase() + text.substring(1)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${name}</span>
          <span class="film-details__comment-day">${getCommentDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export {createCommentTemplate};
