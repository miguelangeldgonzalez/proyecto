import { Repository } from 'typeorm';
import { RoleService } from './role.service';
import { AuthService } from 'src/auth/services/auth.service';
import { ZoneService } from 'src/location/services/zone.service';
import { MailerService } from 'src/mailer/services/mailer.service';
import { User } from '../entities/user.entity';
import { CreateUserDtoRequest, SetUserPasswordDto } from '../dtos/user.dto';
import { RoleNames } from 'src/auth/entities/role.entity';
import { JwtUser } from 'src/auth/guards/jwt-auth.guard';
export declare class UserService {
    private userRepo;
    private mailerService;
    private zoneService;
    private roleService;
    private authService;
    private options;
    constructor(userRepo: Repository<User>, mailerService: MailerService, zoneService: ZoneService, roleService: RoleService, authService: AuthService);
    create(data: CreateUserDtoRequest, LoggedRole: RoleNames): Promise<User>;
    setPassword(data: SetUserPasswordDto, userId: number): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
    getAll(user: JwtUser): Promise<User[]>;
    getById(id: number, user: JwtUser): Promise<User>;
}
