import { JwtCreateUserReturn } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from '../services/user.service';
import { CreateUserDtoRequest, SetUserPasswordDto } from '../dtos/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(body: CreateUserDtoRequest): Promise<import("../entities/user.entity").User>;
    delete(id: number): Promise<{
        message: string;
    }>;
    setPassword(body: SetUserPasswordDto, { user }: JwtCreateUserReturn): Promise<{
        message: string;
    }>;
}
