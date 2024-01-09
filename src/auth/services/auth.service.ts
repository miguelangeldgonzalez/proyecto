import { compare } from 'bcrypt'; 
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/user/entities/user.entity';
import { ReturnVerifyTokenDto } from '../dto/token.dto';

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

    async login(email, password) {
        const user = await this.userRepo.findOne({
            where: {
                email
            },
            relations: ['role', 'states']
        });

        if (user) {
            const isMatch = await compare(password, user.password);

            if (isMatch) {
                return {
                    accessToken: this.generateLoginJwt(user)
                }
            }
            
            return null;
        }

        return null;
    }
}
