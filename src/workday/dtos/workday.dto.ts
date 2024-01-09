import {
    IsString, IsNotEmpty, IsNumber, IsDate, IsOptional
} from 'class-validator';

import { IsIdArray } from 'src/common';

export class CreateWorkdayDTO {
    @IsNotEmpty()
    @IsDate()
    startTime: Date;

    @IsNotEmpty()
    @IsDate()
    endTime: Date;

    @IsString()
    @IsOptional()
    mediaDescription: string;

    @IsString()
    @IsOptional()
    externalAssistanceDescription: string;

    @IsNumber()
    @IsOptional()
    totalExternalAssistance: number;

    @IsNumber()
    @IsOptional()
    workdayLocationId: number;

    @IsIdArray({ minSize: 1 })
    @IsOptional()
    externalAssistanceIds: number[];

    @IsIdArray({ minSize: 1 })
    @IsOptional()
    mediaTypeIds: number[];
}