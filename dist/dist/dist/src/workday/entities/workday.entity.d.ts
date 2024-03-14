import { TimeStamps } from 'src/common/';
import { MediaType } from './media_type.entity';
import { WorkdayLocation } from './workday_location.entity';
import { ExternalAssistance } from './external_assistance.entity';
import { Volunteer } from 'src/volunteer/entities/volunteer.entity';
export declare class Workday extends TimeStamps {
    id: number;
    startTime: Date;
    endTime: Date;
    mediaDescription: string;
    externalAssistanceDescription: string;
    totalExternalAssitance: number;
    workdayLocation: WorkdayLocation;
    mediaTypes: MediaType[];
    externalAssistance: ExternalAssistance[];
    volunteers: Volunteer[];
}
