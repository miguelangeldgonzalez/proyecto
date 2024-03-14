import {
    IsString, IsNotEmpty, IsNumber, IsDate, IsOptional
} from 'class-validator';


import { PartialType } from '@nestjs/swagger';

import { IsIdArray } from 'src/common';
import { MediaType } from '../entities/media_type.entity';
import { ExternalAssistance } from '../entities/external_assistance.entity';

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

export class UpdateWorkdayDTO extends PartialType(CreateWorkdayDTO) { }

export interface GetWorkdayMetadata {
    mediaTypes: MediaType[];
    externalAssistances: ExternalAssistance[];
}