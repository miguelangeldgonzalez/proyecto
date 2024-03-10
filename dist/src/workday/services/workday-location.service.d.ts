import { Repository } from 'typeorm';
import { WorkdayLocation } from '../entities/workday_location.entity';
import { RoleNames } from 'src/auth/entities/role.entity';
import { ZoneService } from 'src/location/services/zone.service';
import { CreateWorkdayLocationDTO, UpdateWorkdayLocationDTO } from '../dtos/workday-location.dto';
export declare class WorkdayLocationService {
    private workdayLocationRepo;
    private zoneService;
    constructor(workdayLocationRepo: Repository<WorkdayLocation>, zoneService: ZoneService);
    create(data: CreateWorkdayLocationDTO): Promise<WorkdayLocation>;
    getById(id: number): Promise<WorkdayLocation>;
    getByWorkdayId(workdayId: number): Promise<WorkdayLocation>;
    getWorkdayLocations(roleName: RoleNames, stateIds?: number[], boroughId?: number): Promise<WorkdayLocation[]>;
    updateWorkdayLocation(id: number, body: UpdateWorkdayLocationDTO, statesUserId: number[] | null): Promise<WorkdayLocation>;
}
