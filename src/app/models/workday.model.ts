import { BasicModel } from "../common/constants";
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
  endTime: Date;
  startTime: Date;
  totalCollected: number;
  mediaDescription: string;
  totalExternalAssistance: number;
  externalAssistanceDescription: string;
  mediaTypes: BasicModel[];
  externalAssistance: BasicModel[];
  workdayLocation: GetWorkdayLocationDTO;
}

export interface GetWorkdayMetadataDTO {
  externalAssistance: BasicModel[];
  mediaTypes: BasicModel[];
}

export interface UpdateWorkdayDTO {
  endTime: Date;
  startTime: Date;
  totalCollected: number;
  mediaDescription: string;
  totalExternalAssistance: number;
  externalAssistanceDescription: string;
  mediaTypeIds: number[];
  externalAssistanceIds: number[];
}


