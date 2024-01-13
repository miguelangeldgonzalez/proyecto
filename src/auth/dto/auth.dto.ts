import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export interface ReturnLoginUserDto extends Omit<User, 'password'> {
    accessToken: string;
}