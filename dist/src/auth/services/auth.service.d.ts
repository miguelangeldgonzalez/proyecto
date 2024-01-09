import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ReturnVerifyTokenDto } from '../dto/token.dto';
export declare class AuthService {
    private jwtService;
    private userRepo;
    constructor(jwtService: JwtService, userRepo: Repository<User>);
    generateJwtForCreateUser(userId: number): {
        accessToken: string;
    };
    verifyToken<T>(token: string): T & ReturnVerifyTokenDto;
    private generateLoginJwt;
    login(email: any, password: any): Promise<{
        accessToken: string;
    }>;
}
