import { BadRequestException, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

// Entities
import { State } from '../entities/state.entity';
import { Borough } from '../entities/borough.entity';
import { Municipality } from '../entities/municipality.entity';

import { ZoneService } from '../services/zone.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('zone')
export class ZoneController {
    constructor(
        private zoneService: ZoneService
    ) {}

    @Get('states')
    getStates(@Query('ids') ids?: string): Promise<State[]> {
        let stateIds: number[];

        try {
            stateIds = JSON.parse(ids);
        } catch {
            throw new BadRequestException(`El parámetro ids debe ser un array de números`)
        }

        return this.zoneService.getStates(stateIds);
    }

    @Get('municipalities/:stateId')
    getMunicipalitiesByStateId(@Param('stateId') stateId: number): Promise<Municipality[]> {
        return this.zoneService.getMunicipalitiesByStateId(stateId);
    }

    @Get('boroughs/:municipalityId')
    getBoroughsByMunicipalityId(@Param('municipalityId') municipalityId: number): Promise<Borough[]> {
        return this.zoneService.getBoroughsByMunicipalityId(municipalityId);
    }
}
