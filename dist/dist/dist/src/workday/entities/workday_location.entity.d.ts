import { TimeStamps } from 'src/common/';
import { Workday } from './workday.entity';
import { Borough } from 'src/location/entities/borough.entity';
export declare class WorkdayLocation extends TimeStamps {
    id: number;
    description: string;
    title: string;
    locationUrl: string;
    workdays: Workday[];
    borough: Borough;
}
