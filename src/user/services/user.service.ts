import { hash } from 'bcrypt'; 
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, QueryFailedError, In, FindManyOptions, FindOptionsSelect, Not } from 'typeorm';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

// Services
import { RoleService } from './role.service';
import { AuthService } from 'src/auth/services/auth.service';
import { ZoneService } from 'src/location/services/zone.service';
import { MailerService } from 'src/mailer/services/mailer.service';

import { User } from '../entities/user.entity';
import { CreateUserDto, CreateUserDtoRequest, SetUserPasswordDto } from '../dtos/user.dto';
import { RoleNames } from 'src/auth/entities/role.entity';
import { JwtUser } from 'src/auth/guards/jwt-auth.guard';

@Injectable()
export class UserService {
    private options: FindManyOptions<User> = {
        select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        relations: ['role', 'states'],
    }

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private mailerService: MailerService,
        private zoneService: ZoneService,
        private roleService: RoleService,
        private authService: AuthService,
    ) {}

    async create(data: CreateUserDtoRequest, LoggedRole: RoleNames) {
        const states = await this.zoneService.getStatesById(data.states);
        const role = await this.roleService.getRoleById(data.roleId);

        if (LoggedRole !== RoleNames.ADMIN && role.name === RoleNames.ADMIN)  throw new ForbiddenException({
            message: 'You can only create users with role state manager and volunteer'
        });


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

    async getAll(user: JwtUser): Promise<User[]> {
        switch (user.role.name) {
            case RoleNames.ADMIN:
                return await this.userRepo.find({
                    ...this.options,
                    where: {
                        id: Not(user.id)
                    }
                });
            case RoleNames.STATE_MANAGER:
                return await this.userRepo.find({
                    ...this.options,
                    where: {
                        id: Not(user.id),
                        states: {
                            id: In(user.states.map(state => state.id))
                        }
                    }
                })
        }
    }

    async getById(id: number, user: JwtUser): Promise<User> {
        const userQueried = await this.userRepo.findOne({
            ...this.options,
            where: { id }
        })

        if (!userQueried) throw new NotFoundException({
            message: 'User not found'
        })

        if (id == user.id) return userQueried;
        

        switch (user.role.name) {
            case RoleNames.ADMIN:
                return userQueried;
            case RoleNames.STATE_MANAGER:
                const contains = user.states.some(element => {
                    return userQueried.states.includes(element);
                });

                if (contains) {
                    return userQueried;
                } else {
                    throw new NotFoundException({
                        message: 'User not found'
                    })
                }
        }
    }

    /**
     * Returns the name of the user that sent the token to set the password
     * @param id 
     * @returns \{ id: number, name: string \}
     */
    async getUserName(id: number) {
        return await this.userRepo.findOne({
            where: { id },
            select: ['id', 'name']
        })
    }
}
