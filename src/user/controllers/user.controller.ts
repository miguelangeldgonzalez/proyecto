import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { RoleGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard, JwtCreateUserReturn } from 'src/auth/guards/jwt-auth.guard';

import { UserService } from '../services/user.service';
import { RoleNames } from 'src/auth/entities/role.entity';
import { Roles } from 'src/auth/decorators/role.decorator';
import { CreateUserDtoRequest, SetUserPasswordDto } from '../dtos/user.dto';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('user')
export class UserController {
    constructor (
        private userService: UserService
    ) {}
    
    @Roles(RoleNames.ADMIN)
    @Post()
    async create(@Body() body: CreateUserDtoRequest) {
        return await this.userService.create(body);
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
}
