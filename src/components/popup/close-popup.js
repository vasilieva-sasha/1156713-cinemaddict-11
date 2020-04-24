import {onEscDown} from "../../tools/utils/utils";
import {remove} from "../../tools/utils/render";


const onPopupClose = (popup) => {
  remove(popup);
  document.removeEventListener(`keydown`, onEscDown);
};

export {onPopupClose};
