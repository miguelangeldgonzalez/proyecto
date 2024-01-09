import {
    IsString, IsNotEmpty, IsEmail, IsInt, Length
} from 'class-validator';

import { IsIdArray } from 'src/common';
import { Role } from '../../auth/entities/role.entity';
import { State } from 'src/location/entities/state.entity';

class CreateUser {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class CreateUserDtoRequest extends CreateUser {
    @IsIdArray({ maxSize: 23, minSize: 1 })
    states: number[];

    @IsInt()
    roleId: number;
}

export class CreateUserDto extends CreateUser {
    states: State[];
    role: Role;
}

export class SetUserPasswordDto {
    @IsString()
    @IsNotEmpty()
    @Length(8)
    password: string;
}

export interface UserIdTokenVerified {
    userId: number;
}