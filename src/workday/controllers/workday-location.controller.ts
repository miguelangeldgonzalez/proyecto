import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';

// Auth
import { ZoneGuard } from 'src/auth/guards/zone.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RoleNames } from 'src/auth/entities/role.entity';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard, JwtUser } from 'src/auth/guards/jwt-auth.guard';

import { WorkdayLocation } from '../entities/workday_location.entity';
import { CreateWorkdayLocationDTO, UpdateWorkdayLocationDTO } from '../dtos/workday-location.dto';
import { WorkdayLocationService } from '../services/workday-location.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('workday-location')
export class WorkdayLocationController {
    constructor(
        private workdayLocationService: WorkdayLocationService
    ) {}

    @Roles(RoleNames.ADMIN, RoleNames.STATE_MANAGER)
    @UseGuards(ZoneGuard)
    @Post()
    async create(@Body() body: CreateWorkdayLocationDTO): Promise<WorkdayLocation> {
        return await this.workdayLocationService.create(body);
    }

    @Roles(RoleNames.ADMIN, RoleNames.STATE_MANAGER)
    @Get()
    async getWorkdayLocations(@Req() { user } : { user: JwtUser }, @Query() { boroughId }: { boroughId: number } ): Promise<WorkdayLocation[]> {
        boroughId = parseInt(boroughId as any);
        
        let stateIds = user.role.name === RoleNames.ADMIN ? 
                null : 
                user.states.map(state => state.id);

        const role = user.role.name as RoleNames;

        return await this.workdayLocationService.getWorkdayLocations(role, stateIds, boroughId);
    }

    @Roles(RoleNames.ADMIN, RoleNames.STATE_MANAGER)
    @Patch('/:id') 
    async updateWorkdayLocation(
        @Req() { user } : { user: JwtUser }, 
        @Param('id') id: number, 
        @Body() body: UpdateWorkdayLocationDTO
    ): Promise<WorkdayLocation> {
        const stateIds: null | number[] = user.role.name === RoleNames.ADMIN ? 
                null : 
                user.states.map(state => state.id);

        return await this.workdayLocationService.updateWorkdayLocation(id, body, stateIds);
    }

}
