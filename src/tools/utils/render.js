import {Position} from "../../consts/consts";

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element.getElement());
      break;
    case Position.BEFOREEND:
      container.append(element.getElement());
      break;
    case Position.AFTEREND:
      container.after(element.getElement());
      break;
    case Position.BEFOREBEGIN:
      container.before(element.getElement());
      break;
  }
};

export const remove = (element) => {
  element.getElement().remove();
  element.removeElement();
};
