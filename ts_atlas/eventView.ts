import { searchApi } from "./atlasManager.js";

export const declareEvents = (): void => {
  let search_btn = document.querySelector("#search_btn") as HTMLElement;
  let id_input = document.querySelector("#id_input") as HTMLInputElement;

  id_input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      searchApi(id_input.value);
    }
  });

  search_btn.addEventListener("click", () => {
    searchApi(id_input.value);
  });
};
