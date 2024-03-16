import { Borough } from "./zone.model";
import { FormControlled } from "../common/constants";

/**
 * @description Base interface for workday location DTOs
 */
interface WorkdayLocation {
  title: string;
  description: string;
  locationUrl: string;
}

export interface CreateWorkdayLocationDTO extends WorkdayLocation {
  boroughId: number;
}

export interface GetWorkdayLocationDTO extends WorkdayLocation{
  id: number;
  borough: Borough;
}

export interface UpdateWorkdayLocationDTO extends WorkdayLocation {
  id: number;
  boroughId: number;
}

export type WorkdayLocationFormControl =
  FormControlled<UpdateWorkdayLocationDTO>;
