import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetVolunteerDTO {
    @IsOptional()
    @IsInt()
    id: number;

    @IsOptional()
    @IsInt()
    identification: number;
}

export class CreateVolunteerDTO {
    @IsInt()
    @IsNotEmpty()
    identification: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsBoolean()
    @IsOptional()
    hasPet: boolean;

    @IsDate()
    @IsOptional()
    birthDate: Date;

    @IsInt()
    @IsNotEmpty()
    boroughId: number;
    
    @IsInt()
    @IsNotEmpty()
    workdayId: number;
}