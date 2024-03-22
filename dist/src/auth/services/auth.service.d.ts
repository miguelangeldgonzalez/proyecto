import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginUserDto } from '../dto/auth.dto';
import { ReturnVerifyTokenDto } from '../dto/token.dto';
import { User } from 'src/user/entities/user.entity';
export declare class AuthService {
    private jwtService;
    private userRepo;
    constructor(jwtService: JwtService, userRepo: Repository<User>);
    generateJwtForCreateUser(userId: number): {
        accessToken: string;
    };
    generateJwtForResetPassword(email: string): {
        accessToken: string;
    };
    verifyToken<T>(token: string): T & ReturnVerifyTokenDto;
    private generateLoginJwt;
    login(email: any, password: any): Promise<ReturnLoginUserDto>;
}
