import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateWorkdayLocationDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    locationUrl: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    boroughId: number;
}