import { BadRequestException, Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

// Auth
import { ZoneGuard } from 'src/auth/guards/zone.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ActiveWorkdayGuard } from 'src/auth/guards/active-workday.guard';

import { Volunteer } from '../entities/volunteer.entity';
import { VolunteerService } from '../services/volunteer.service';
import { CreateVolunteerDTO, GetVolunteerDTO } from '../dtos/volunteer.dto';

@UseGuards(JwtAuthGuard)
@Controller('volunteer')
export class VolunteerController {
    constructor(
        private volunteerService: VolunteerService,
    ) {}

    @Get()
    async getVolunteer(@Query() query: GetVolunteerDTO): Promise<Volunteer> {
        if (!query.id && !query.identification) {
            throw new BadRequestException('Debe especificar un id o una identificación');
        } else {
            return await this.volunteerService.getVolunteer(query);
        }
    }

    @UseGuards(ZoneGuard, ActiveWorkdayGuard)
    @Post()
    async createVolunteer(@Body() body: CreateVolunteerDTO): Promise<Volunteer> {
        return this.volunteerService.createVolunteer(body);
    }
}
