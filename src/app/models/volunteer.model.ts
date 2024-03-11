import { FormControlled } from "./constants";
import { Borough } from "./zone.model";

export interface GetVolunteerDTO {
  id: number;
  identification: number;
  name: string;
  phone: string;
  /**
   * Returns Date as string
   */
  birthDate: string;
  hasPet: boolean;
  borough: Borough;
}

export interface CreateVolunteerDTO {
  identification: number;
  name: string;
  phone: string;
  birthDate: Date;
  hasPet: boolean;
}

export type VolunteerFormControl = FormControlled<CreateVolunteerDTO>;
