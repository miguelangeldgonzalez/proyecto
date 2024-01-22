import { JwtCreateUserReturn, JwtUser } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserDtoRequest, SetUserPasswordDto } from '../dtos/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(body: CreateUserDtoRequest, { user }: {
        user: JwtUser;
    }): Promise<User>;
    delete(id: number): Promise<{
        message: string;
    }>;
    setPassword(body: SetUserPasswordDto, { user }: JwtCreateUserReturn): Promise<{
        message: string;
    }>;
    getAll({ user }: {
        user: JwtUser;
    }): Promise<User[]>;
    getById(id: number, { user }: {
        user: JwtUser;
    }): Promise<User>;
}
