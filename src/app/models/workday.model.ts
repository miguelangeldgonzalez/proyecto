import { GetWorkdayLocationDTO } from "./location.model";

export interface CreateWorkdayFormDTO {
  endTime: Date;
  startTime: Date;
}

export interface CreateWorkdayDTO extends CreateWorkdayFormDTO {
  workdayLocationId: number;
}

export interface GetWorkdayDTO extends CreateWorkdayDTO {
  id: number;
  workdayLocation: GetWorkdayLocationDTO;
}
