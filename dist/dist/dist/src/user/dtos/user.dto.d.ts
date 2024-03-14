import { Role } from '../../auth/entities/role.entity';
import { State } from 'src/location/entities/state.entity';
declare class CreateUser {
    name: string;
    email: string;
}
export declare class CreateUserDtoRequest extends CreateUser {
    states: number[];
    roleId: number;
}
export declare class CreateUserDto extends CreateUser {
    states: State[];
    role: Role;
}
export declare class SetUserPasswordDto {
    password: string;
}
export interface UserIdTokenVerified {
    userId: number;
}
export {};
