import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { State } from '../entities/state.entity';
import { Borough } from '../entities/borough.entity';
import { Municipality } from '../entities/municipality.entity';

@Injectable()
export class ZoneService {
    constructor(
        @InjectRepository(State) private stateRepo: Repository<State>,
        @InjectRepository(Borough) private boroughRepo: Repository<Borough>,
        @InjectRepository(Municipality) private municipalityRepo: Repository<Municipality>
    ) {}
    
    /**
     * Get states with an array of ids
     * @param ids 
     * @returns 
     */
    async getStatesById(ids: number[]): Promise<State[]> {
        const states = await this.stateRepo.find({
            where: { id: In(ids) }
        })

        if (states.length == 0) throw new NotFoundException({
            message: `No se encontraron estados con los ids ${JSON.stringify(ids)}`
        })

        return states;
    }

    /**
     * Get all states or states with an array of ids
     * @param ids 
     * @returns 
     */
    async getStates(ids?: number[]): Promise<State[]> {
        if (ids) return await this.getStatesById(ids);
        return await this.stateRepo.find();
    }

    /**
     * Get municipalities with the state id
     * @param id 
     * @returns 
     */
    async getMunicipalitiesByStateId(id: number): Promise<Municipality[]> {
        const municipalities = await this.municipalityRepo.find({
            where: { state: { id } }
        })

        if (municipalities.length == 0) throw new NotFoundException({
            message: `No se encontraron municipios para el estado ${id}`
        })

        return municipalities;
    }

    /**
     * Get boroughs with the municipality id
     * @param id 
     * @returns 
     */
    async getBoroughsByMunicipalityId(id: number): Promise<Borough[]> {
        const boroughs = await this.boroughRepo.find({
            where: { municipality: { id } }
        })

        if (boroughs.length == 0) throw new NotFoundException({
            message: `No se encontraron parroquias para el municipio ${id}`
        })

        return boroughs;
    }

    /**
     * Validate if a borough is insade in some of the speciefied states
     * @param boroughId 
     * @param stateId 
     * @returns 
     */
    async validateBoroughInStates(boroughId: number, stateIds: number[]): Promise<Borough | null> {
        return await this.boroughRepo.findOne({
            where: { 
                id: boroughId, 
                municipality: {
                    state: {
                        id: In(stateIds)
                    }
                }
            },
            relations: ['municipality', 'municipality.state'],
        })
    }
    
    /**
     * Get boroughs with id
     * @param stateId 
     * @returns 
     */
    async findBoroughById(id: number): Promise<Borough> {
        const borough = await this.boroughRepo.findOne({
            where: { id },
            relations: ['municipality', 'municipality.state'],
        })

        if (!borough) throw new NotFoundException({
            message: `No se encontró la parroquia con el id ${id}`
        })

        return borough;
    }
}
