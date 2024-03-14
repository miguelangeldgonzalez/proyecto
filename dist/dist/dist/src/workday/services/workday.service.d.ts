import { Repository } from 'typeorm';
import { Workday } from '../entities/workday.entity';
import { MediaType } from '../entities/media_type.entity';
import { ExternalAssistance } from '../entities/external_assistance.entity';
import { CreateWorkdayDTO, UpdateWorkdayDTO } from '../dtos/workday.dto';
import { WorkdayLocationService } from './workday-location.service';
import { RoleNames } from 'src/auth/entities/role.entity';
export declare class WorkdayService {
    private workdayLocationService;
    private workdayRepo;
    private mediaTypeRepo;
    private externalAssistanceRepo;
    constructor(workdayLocationService: WorkdayLocationService, workdayRepo: Repository<Workday>, mediaTypeRepo: Repository<MediaType>, externalAssistanceRepo: Repository<ExternalAssistance>);
    getById(workdayId: number): Promise<Workday>;
    create(data: CreateWorkdayDTO): Promise<Workday>;
    getWorkdayById(id: number): Promise<Workday>;
    checkActiveWorkday(id: number): Promise<boolean>;
    getWorkdays(role: RoleNames, stateIds?: number[]): Promise<Workday[]>;
    delete(id: number): Promise<Workday>;
    getWorkdayMetadata(): Promise<{
        mediaTypes: MediaType[];
        externalAssistance: ExternalAssistance[];
    }>;
    update(workdayId: number, body: UpdateWorkdayDTO): Promise<{
        startTime: Date;
        endTime: Date;
        mediaDescription: string;
        externalAssistanceDescription: string;
        totalExternalAssistance?: number;
        workdayLocationId?: number;
        externalAssistanceIds?: number[];
        mediaTypeIds?: number[];
        id: number;
        totalExternalAssitance: number;
        workdayLocation: import("../entities/workday_location.entity").WorkdayLocation;
        mediaTypes: MediaType[];
        externalAssistance: ExternalAssistance[];
        volunteers: import("../../volunteer/entities/volunteer.entity").Volunteer[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    } & Workday>;
}
