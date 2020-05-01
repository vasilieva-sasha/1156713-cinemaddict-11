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

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
