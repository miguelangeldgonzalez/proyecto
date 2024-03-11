import { FormGroup } from "@angular/forms";
import { FormControlStatus } from "./constants";

/**
   * Reproduce animation for invalid inputs
   * @param form Form that has invalid inputs
   * @param error Object that contains error flags for each input
   */
export async function shakeInputsError(form: FormGroup, error: any) {
  const keys = Object.keys(form.controls);
        keys.forEach(key => {
          if (form.controls[key].status == FormControlStatus.INVALID) {
            (error as any)[key] = true;
          }
        })
        setTimeout(() => {
          keys.forEach(key => {
            (error as any)[key] = false;
          })
        }, 300)
}
