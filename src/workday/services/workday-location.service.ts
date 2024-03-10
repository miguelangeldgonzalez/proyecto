import { FindManyOptions, FindOptionsWhere, FindOptionsWhereProperty, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

// Entities
import { WorkdayLocation } from '../entities/workday_location.entity';

import { RoleNames } from 'src/auth/entities/role.entity';
import { ZoneService } from 'src/location/services/zone.service';
import { CreateWorkdayLocationDTO, UpdateWorkdayLocationDTO } from '../dtos/workday-location.dto';

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

    /**
     * Return all workday locations if the user is an admin otherwise return the locations 
     * of the states the state managers is in charge of. If boroughId is specified return 
     * the locations of the borough
     * @param user 
     * @returns 
     */
    async getWorkdayLocations(roleName: RoleNames, stateIds?: number[], boroughId?: number): Promise<WorkdayLocation[]> {
        const relations = ['borough', 'borough.municipality', 'borough.municipality.state'];
        const where: FindOptionsWhere<WorkdayLocation> = {};

        if (RoleNames.ADMIN === roleName && boroughId) {
            where.borough = {
                id: boroughId
            }
        } else if (RoleNames.STATE_MANAGER === roleName) {
            where.borough = {
                municipality: {
                    state: {
                        id: In(stateIds)
                    }
                }
            }

            if (boroughId) {
                where.borough.id = boroughId;
            }
        }

        switch (roleName) {
            case RoleNames.ADMIN:
                return await this.workdayLocationRepo.find({
                    relations,
                    where
                })
            case RoleNames.STATE_MANAGER:
                return await this.workdayLocationRepo.find({
                    relations,
                    where
                })  
        }
    }

    async updateWorkdayLocation(id: number, body: UpdateWorkdayLocationDTO, statesUserId: number[] | null): Promise<WorkdayLocation> {
        const location = await this.getById(id);

        // If statesUserId is null then the user is an admin and can modify any location
        if (statesUserId) {
            const borough = this.zoneService.validateBoroughInStates(location.borough.id, statesUserId);
            if (!borough) throw new UnauthorizedException('No tienes permisos para modificar esta locación');
        }

        const locationUpdated: WorkdayLocation = {
            ...location,
            ...body
        }

        // If the user wants to update the borough
        if (body.boroughId) {
            // Validate if not is an admin
            if (statesUserId) {
                locationUpdated.borough = await this.zoneService.validateBoroughInStates(body.boroughId, statesUserId);
                if (!locationUpdated.borough) throw new ForbiddenException('No tienes permisos para añadir esta parroquia a la ubicación');
            } else {
                locationUpdated.borough = await this.zoneService.findBoroughById(body.boroughId);
            }

            delete body.boroughId;
        }

        return await this.workdayLocationRepo.save(locationUpdated);
    }
}
