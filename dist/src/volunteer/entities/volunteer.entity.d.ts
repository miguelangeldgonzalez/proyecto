import { TimeStamps } from 'src/common/';
import { Workday } from 'src/workday/entities/workday.entity';
import { Borough } from 'src/location/entities/borough.entity';
export declare class Volunteer extends TimeStamps {
    id: number;
    identification: number;
    name: string;
    phone: string;
    hasPet: boolean;
    birthDate: Date;
    borough: Borough;
    workdays: Workday[];
}
