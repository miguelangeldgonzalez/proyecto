import { User } from "src/user/entities/user.entity";
export declare class LoginUserDto {
    email: string;
    password: string;
}
export interface ReturnLoginUserDto extends Omit<User, 'password'> {
    accessToken: string;
}
