import {filters} from "./../../../mock/filters";

const createSiteNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createNavigationMarkup()}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const getActiveClass = (filter) => filter.isActive ? `main-navigation__item--active` : ``;
const showAmount = (filter) => filter.name === `All movies` ? `` : `<span class="main-navigation__item-count">${filter.count}</span>`;

const createNavigationItemMarkup = (filter) => {
  return (
    `<a href="#all" class="main-navigation__item ${getActiveClass(filter)}">${filter.name}${showAmount(filter)}</a>`
  );
};

const createNavigationMarkup = () => {
  return filters.map(createNavigationItemMarkup).join(`\n`);
};

export {createSiteNavigationTemplate};
