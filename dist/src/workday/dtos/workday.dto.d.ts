import { MediaType } from '../entities/media_type.entity';
import { ExternalAssistance } from '../entities/external_assistance.entity';
export declare class CreateWorkdayDTO {
    startTime: Date;
    endTime: Date;
    mediaDescription: string;
    externalAssistanceDescription: string;
    totalExternalAssistance: number;
    totalCollected: number;
    workdayLocationId: number;
    externalAssistanceIds: number[];
    mediaTypeIds: number[];
}
declare const UpdateWorkdayDTO_base: import("@nestjs/common").Type<Partial<CreateWorkdayDTO>>;
export declare class UpdateWorkdayDTO extends UpdateWorkdayDTO_base {
}
export interface GetWorkdayMetadata {
    mediaTypes: MediaType[];
    externalAssistances: ExternalAssistance[];
}
export {};
