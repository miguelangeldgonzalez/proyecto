import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

// Auth
import { RoleGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard, JwtCreateUserReturn, JwtUser } from 'src/auth/guards/jwt-auth.guard';

// Entities
import { User } from '../entities/user.entity';
import { RoleNames } from 'src/auth/entities/role.entity';

import { UserService } from '../services/user.service';
import { Roles } from 'src/auth/decorators/role.decorator';
import { CreateUserDtoRequest, SetUserPasswordDto } from '../dtos/user.dto';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('user')
export class UserController {
    constructor (
        private userService: UserService
    ) {}
    
    @Get('token-status')
    async tokenStatus(@Req() { user }: JwtCreateUserReturn): Promise<{ id: number, name: string}> {
        return this.userService.getUserName(user.userId);
    }
    
    @Roles(RoleNames.ADMIN, RoleNames.STATE_MANAGER)
    @Post()
    async create(@Body() body: CreateUserDtoRequest, @Req() { user }: { user: JwtUser }): Promise<User> {
        if (user.role.name === RoleNames.STATE_MANAGER) {
            const stateIds = user.states.map(state => state.id);
            let containAll = true;

            body.states.forEach(stateId => {
                if (!stateIds.includes(stateId)) {
                    containAll = false;
                }
            })

            if (!containAll) throw new ForbiddenException({
                message: 'You can only create users for your states'
            });
        }

        return await this.userService.create(body, user.role.name as RoleNames);
    }

    @Roles(RoleNames.ADMIN)
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return await this.userService.delete(id);
    }

    @Patch('set-password')
    async setPassword(@Body() body: SetUserPasswordDto, @Req() { user }: JwtCreateUserReturn) {
        return await this.userService.setPassword(body, user.userId);
    }

    @Roles(RoleNames.ADMIN, RoleNames.STATE_MANAGER)
    @Get()
    async getAll(@Req() { user }: { user: JwtUser }): Promise<User[]> {
        return await this.userService.getAll(user);   
    }

    @Roles(RoleNames.ADMIN, RoleNames.STATE_MANAGER)
    @Get('/:id')
    async getById(@Param('id') id: number, @Req() { user }: { user: JwtUser }): Promise<User> {
        return await this.userService.getById(id, user);
    }

    @Roles(RoleNames.ADMIN)
    @Get('/resend-token/:id')
    async resendToken(@Param('id') id: number) {
        return await this.userService.resendToken(id);
    }
}
