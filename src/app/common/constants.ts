import { NgForm } from "@angular/forms";
import { FormControl } from "@angular/forms";

export const HOST = 'https://proyecto-dev-fgec.3.us-1.fl0.io/api';

/**
 * This class is just to be used as a Param Type of the class NgForm
 */
export class FormValue<T> extends NgForm {
  public override get value (): T { return {} as T};
}

/**
 * ControlStatus of NgForm.form.status
 */
export enum FormControlStatus {
  VALID = 'VALID',
  INVALID = 'INVALID'
}


export type FormControlled<T> = {
  [P in keyof T]: FormControl<T[P]>;
};

/**
 * @description: Set the scroll position to the top of the page
 */
export const setToTop = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

/**
 * @description Set basic model to be extended
 */
export interface BasicModel {
  id: number;
  name: string;
}

/**
 * Verify if the value is empty
 * @param value
 * @returns
 */
export function isEmpty(value: any) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return value === undefined || value === null || value === '';
}
