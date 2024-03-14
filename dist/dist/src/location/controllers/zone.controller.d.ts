import { State } from '../entities/state.entity';
import { Borough } from '../entities/borough.entity';
import { Municipality } from '../entities/municipality.entity';
import { ZoneService } from '../services/zone.service';
export declare class ZoneController {
    private zoneService;
    constructor(zoneService: ZoneService);
    getStates(ids?: string): Promise<State[]>;
    getMunicipalitiesByStateId(stateId: number): Promise<Municipality[]>;
    getBoroughsByMunicipalityId(municipalityId: number): Promise<Borough[]>;
}
