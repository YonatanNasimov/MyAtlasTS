import { doApi } from "./atlasManager.js";
import { declareEvents } from "./eventView.js";

const init = (): void => {
  doApi();
  declareEvents();
};

init();