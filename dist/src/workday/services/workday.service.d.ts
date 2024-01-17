import { Repository } from 'typeorm';
import { Workday } from '../entities/workday.entity';
import { MediaType } from '../entities/media_type.entity';
import { ExternalAssistance } from '../entities/external_assistance.entity';
import { CreateWorkdayDTO } from '../dtos/workday.dto';
import { WorkdayLocationService } from './workday-location.service';
import { RoleNames } from 'src/auth/entities/role.entity';
export declare class WorkdayService {
    private workdayLocationService;
    private workdayRepo;
    private mediaTypeRepo;
    private externalAssistanceRepo;
    constructor(workdayLocationService: WorkdayLocationService, workdayRepo: Repository<Workday>, mediaTypeRepo: Repository<MediaType>, externalAssistanceRepo: Repository<ExternalAssistance>);
    create(data: CreateWorkdayDTO): Promise<Workday>;
    getWorkdayById(id: number): Promise<Workday>;
    checkActiveWorkday(id: number): Promise<boolean>;
    getWorkdays(role: RoleNames, stateIds?: number[]): Promise<Workday[]>;
}
