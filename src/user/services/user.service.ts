import { hash } from 'bcrypt'; 
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, QueryFailedError } from 'typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';

// Services
import { RoleService } from './role.service';
import { AuthService } from 'src/auth/services/auth.service';
import { ZoneService } from 'src/location/services/zone.service';
import { MailerService } from 'src/mailer/services/mailer.service';

import { User } from '../entities/user.entity';
import { CreateUserDto, CreateUserDtoRequest, SetUserPasswordDto } from '../dtos/user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private mailerService: MailerService,
        private zoneService: ZoneService,
        private roleService: RoleService,
        private authService: AuthService,
    ) {}

    async create(data: CreateUserDtoRequest) {
        const states = await this.zoneService.getStatesById(data.states);
        const role = await this.roleService.getRoleById(data.roleId);

        const user: CreateUserDto = {
            ...data,
            states,
            role
        };

        const newUser = this.userRepo.create(user);
        const createdUser = await this.userRepo.save(newUser);

        const token = this.authService.generateJwtForCreateUser(createdUser.id);
        await this.mailerService.sendMailForCreateUser(createdUser.email, token.accessToken);

        return createdUser;
    }

    async setPassword(data: SetUserPasswordDto, userId: number) {
        const user = await this.userRepo.findOne({
            where: {
                password: IsNull(),
                id: userId
            }
        });

        if (!user) {
            throw new ForbiddenException({
                message: 'invalid token'
            });
        }

        user.password = await hash(data.password, 10);

        try {
            await this.userRepo.save(user);
        } catch (error) {
            throw new ForbiddenException({
                message: 'invalid token'
            });
        }
        return {
            message: 'Password set successfully'
        }
    }

    async delete(id: number) {
        try {
            await this.userRepo.delete(id);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new ForbiddenException({
                    message: 'invalid token'
                });
            }
        }
        return {
            message: 'User deleted successfully'
        }
    }
}
