import { JwtUser } from 'src/auth/guards/jwt-auth.guard';
import { CreateWorkdayDTO, UpdateWorkdayDTO } from '../dtos/workday.dto';
import { WorkdayService } from '../services/workday.service';
export declare class WorkdayController {
    private workdayService;
    constructor(workdayService: WorkdayService);
    getById(workdayId: number): Promise<import("../entities/workday.entity").Workday>;
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
        mediaTypes: import("../entities/media_type.entity").MediaType[];
        externalAssistance: import("../entities/external_assistance.entity").ExternalAssistance[];
        volunteers: import("../../volunteer/entities/volunteer.entity").Volunteer[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    } & import("../entities/workday.entity").Workday>;
    getWorkdayMetadata(): Promise<{
        mediaTypes: import("../entities/media_type.entity").MediaType[];
        externalAssistance: import("../entities/external_assistance.entity").ExternalAssistance[];
    }>;
    create(body: CreateWorkdayDTO): Promise<import("../entities/workday.entity").Workday>;
    getWorkdays({ user }: {
        user: JwtUser;
    }): Promise<import("../entities/workday.entity").Workday[]>;
    delete(workdayId: number): Promise<import("../entities/workday.entity").Workday>;
}
