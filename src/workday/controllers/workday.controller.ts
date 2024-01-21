import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

// Auth
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RoleNames } from 'src/auth/entities/role.entity';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard, JwtUser } from 'src/auth/guards/jwt-auth.guard';

import { CreateWorkdayDTO } from '../dtos/workday.dto';
import { ZoneGuard } from 'src/auth/guards/zone.guard';
import { WorkdayService } from '../services/workday.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('workday')
export class WorkdayController {
    constructor (
        private workdayService: WorkdayService
    ) {}
    
    @Roles(RoleNames.ADMIN, RoleNames.STATE_MANAGER)
    @UseGuards(ZoneGuard)
    @Post()
    async create(@Body() body: CreateWorkdayDTO) {
        return await this.workdayService.create(body);
    }

    @Get()
    async getWorkdays(@Req() { user } : { user: JwtUser } ) {
        let stateIds = user.role.name === RoleNames.ADMIN ? 
                null : 
                user.states.map(state => state.id);

        const role = user.role.name as RoleNames;

        return await this.workdayService.getWorkdays(role, stateIds);
    }

    @Roles(RoleNames.ADMIN, RoleNames.STATE_MANAGER)
    @UseGuards(ZoneGuard)
    @Delete('/:workdayId')
    async delete(@Param('workdayId') workdayId: number) {
        return await this.workdayService.delete(workdayId);
    }
}
