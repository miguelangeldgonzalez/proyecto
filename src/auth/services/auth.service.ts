import { compare } from 'bcrypt'; 
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';

// DTOs
import { ReturnLoginUserDto } from '../dto/auth.dto';
import { ReturnVerifyTokenDto } from '../dto/token.dto';

import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private userRepo: Repository<User>
    ) {}

    generateJwtForCreateUser(userId: number) {
        const accessToken = this.jwtService.sign({ userId });
        return {
            accessToken
        }
    }

    generateJwtForResetPassword(email: string) {
        const accessToken = this.jwtService.sign({ email, resetPassword: true });
        return {
            accessToken
        }
    }

    /**
     * Verify if a token was signed by the JWT_SECRET
     * @param token 
     * @returns 
     */
    verifyToken<T>(token: string): T & ReturnVerifyTokenDto {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                throw new ForbiddenException({
                    message: error.message
                });
            }
            return error;
        }
    }

    private generateLoginJwt(user: User) {
        delete user.password;

        return this.jwtService.sign({...user});
    }

    async login(email, password): Promise<ReturnLoginUserDto> {
        const user = await this.userRepo.findOne({
            where: {
                email
            },
            relations: ['role', 'states']
        });

        if (user) {
            const isMatch = await compare(password, user.password);
            delete user.password;

            if (isMatch) {
                return {
                    ...user,
                    accessToken: this.generateLoginJwt(user)
                }
            }
            
            return null;
        }

        return null;
    }
}
