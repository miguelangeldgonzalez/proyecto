import { Municipality } from './municipality.entity';
import { WorkdayLocation } from 'src/workday/entities/workday_location.entity';
export declare class Borough {
    id: number;
    name: string;
    municipality: Municipality;
    workdaysLocations: WorkdayLocation[];
}
