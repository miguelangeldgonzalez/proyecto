import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

// Entities
import { WorkdayLocation } from '../entities/workday_location.entity';

import { ZoneService } from 'src/location/services/zone.service';
import { CreateWorkdayLocationDTO } from '../dtos/workday-location.dto';

@Injectable()
export class WorkdayLocationService {
    constructor(
        @InjectRepository(WorkdayLocation) private workdayLocationRepo: Repository<WorkdayLocation>,
        private zoneService: ZoneService
    ) { }
    
    /**
     * Create a location for to be used by a workday
     * @param data 
     * @param user 
     * @returns 
     */
    async create(data: CreateWorkdayLocationDTO): Promise<WorkdayLocation> {
        var borough = await this.zoneService.findBoroughById(data.boroughId);
        delete data.boroughId;
        
        const location = await this.workdayLocationRepo.create({
            ...data,
            borough
        });

        return await this.workdayLocationRepo.save(location);
    }

    /**
     * Get a location by id
     * @param id 
     * @returns 
     */
    async getById(id: number): Promise<WorkdayLocation> {
        const location = await this.workdayLocationRepo.findOne({
            where: { id },
            relations: ['borough']
        });

        if (!location) throw new NotFoundException('No se encontró la locación');

        return location;
    }

    /**
     * Get a location by workday id
     * @param workdayId 
     * @returns 
     */
    async getByWorkdayId(workdayId: number): Promise<WorkdayLocation> {
        const location = await this.workdayLocationRepo.findOne({
            where: { 
                workdays: { id: workdayId }
            },
            relations: ['borough']
        });

        if (!location) throw new NotFoundException('No se encontró la locacion con la jornada especificada');

        return location;
    }
}
