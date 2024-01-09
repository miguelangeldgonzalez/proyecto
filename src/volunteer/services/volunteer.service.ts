import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

// Services
import { ZoneService } from 'src/location/services/zone.service';
import { WorkdayService } from 'src/workday/services/workday.service';

import { Volunteer } from '../entities/volunteer.entity';
import { CreateVolunteerDTO, GetVolunteerDTO } from '../dtos/volunteer.dto';

@Injectable()
export class VolunteerService {
    constructor(
        private zoneService: ZoneService,
        private workdayService: WorkdayService,
        @InjectRepository(Volunteer) private volunteerRepository: Repository<Volunteer>
    ) {}

    /**
     * Get a volunteer by id or identification
     * @param query GetVolunteerDTO
     * @returns 
     */
    async getVolunteer(query: GetVolunteerDTO): Promise<Volunteer> {
        const volunteer = await this.volunteerRepository.findOne({
            where: query
        });

        if (!volunteer) {
            throw new NotFoundException(`No se encontró el voluntario con estos parametros ${JSON.stringify(query)}`);
        } else {
            return volunteer;
        }
    }

    /**
     * Create a new volunteer
     * @param data CreateVolunteerDTO
     * @returns 
     */
    async createVolunteer(data: CreateVolunteerDTO): Promise<Volunteer> {
        const borough = await this.zoneService.findBoroughById(data.boroughId);
        delete data.boroughId;

        const workday = await this.workdayService.getWorkdayById(data.workdayId);
        delete data.workdayId;

        const volunteer = this.volunteerRepository.create({
            borough,
            workdays: [workday],
            ...data
        });

        try {
            return await this.volunteerRepository.save(volunteer);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                if ((error.driverError.detail as string).includes('identification')) {
                    throw new BadRequestException('Ya existe un voluntario con esta identificación');
                }
            }

            throw new InternalServerErrorException('Error al crear el voluntario');
        }
    }
}
