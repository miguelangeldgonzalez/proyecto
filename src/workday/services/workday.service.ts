import { In, LessThan, Repository } from 'typeorm';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entities
import { Workday } from '../entities/workday.entity';
import { MediaType } from '../entities/media_type.entity';
import { ExternalAssistance } from '../entities/external_assistance.entity';

import { CreateWorkdayDTO } from '../dtos/workday.dto';
import { WorkdayLocationService } from './workday-location.service';

@Injectable()
export class WorkdayService {
    constructor(
        private workdayLocationService: WorkdayLocationService,
        @InjectRepository(Workday) private workdayRepo: Repository<Workday> ,
        @InjectRepository(MediaType) private mediaTypeRepo: Repository<MediaType> ,
        @InjectRepository(ExternalAssistance) private externalAssistanceRepo: Repository<ExternalAssistance>
    ) {}

    /**
     * Create a new workday
     * @param data 
     * @returns 
     */
    async create(data: CreateWorkdayDTO): Promise<Workday> {
        const manyEntities = [
            {
                name: 'externalAssistanceIds',
                repo: this.externalAssistanceRepo,
                newName: 'externalAssistance'
            },{
                name: 'mediaTypeIds',
                repo: this.mediaTypeRepo,
                newName: 'mediaTypes'
            }
        ];

        for (const e of manyEntities) {
            if (data[e.name]?.length > 0) {
                const entities = await e.repo.find({
                    where: {
                        id: In(data[e.name])
                    }
                });

                delete data[e.name];

                if (entities.length > 0) data[e.newName] = entities;
            }
        }

        const workdayLocation = await this.workdayLocationService.getById(data.workdayLocationId);
        delete data.workdayLocationId;

        const workday = this.workdayRepo.create({
            ...data,
            workdayLocation
        });

        return await this.workdayRepo.save(workday);
    }

    /**
     * Get a workday by id
     * @param id 
     * @returns 
     */
    async getWorkdayById(id: number): Promise<Workday> {
        const workday = await this.workdayRepo.findOne({
            where: { id }
        })

        if (!workday) throw new NotFoundException(`No se encontró la jornada con el id ${id}`);

        return workday;
    }

    async checkActiveWorkday(id: number) {
        const workday = await this.workdayRepo.findOne({
            where: { 
                id,
                endTime: LessThan(new Date(Date.now())) 
            }
        });

        if (!workday) throw new UnauthorizedException(`La jornada con el id ${id} ya se cerró`);

        return true;
    }
}
