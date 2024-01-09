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
