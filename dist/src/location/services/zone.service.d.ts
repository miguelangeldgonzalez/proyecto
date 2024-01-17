import { Repository } from 'typeorm';
import { State } from '../entities/state.entity';
import { Borough } from '../entities/borough.entity';
import { Municipality } from '../entities/municipality.entity';
export declare class ZoneService {
    private stateRepo;
    private boroughRepo;
    private municipalityRepo;
    constructor(stateRepo: Repository<State>, boroughRepo: Repository<Borough>, municipalityRepo: Repository<Municipality>);
    getStatesById(ids: number[]): Promise<State[]>;
    getStates(ids?: number[]): Promise<State[]>;
    getMunicipalitiesByStateId(id: number): Promise<Municipality[]>;
    getBoroughsByMunicipalityId(id: number): Promise<Borough[]>;
    validateBoroughInStates(boroughId: number, stateIds: number[]): Promise<Borough | null>;
    findBoroughById(id: number): Promise<Borough>;
}
