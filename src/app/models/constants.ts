import { FormControl } from "@angular/forms";

export type FormControlled<T> = {
  [P in keyof T]: FormControl<T[P]>;
};

/**
 * @description: Set the scroll position to the top of the page
 */
export const setToTop = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}
