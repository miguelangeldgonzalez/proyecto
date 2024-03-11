import { NgForm } from "@angular/forms";

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
