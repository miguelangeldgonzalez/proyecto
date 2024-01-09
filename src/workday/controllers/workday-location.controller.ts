import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

// Auth
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RoleNames } from 'src/auth/entities/role.entity';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { ZoneGuard } from 'src/auth/guards/zone.guard';
import { WorkdayLocation } from '../entities/workday_location.entity';
import { CreateWorkdayLocationDTO } from '../dtos/workday-location.dto';
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
}
