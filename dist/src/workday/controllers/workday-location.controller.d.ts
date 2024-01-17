import { JwtUser } from 'src/auth/guards/jwt-auth.guard';
import { WorkdayLocation } from '../entities/workday_location.entity';
import { CreateWorkdayLocationDTO } from '../dtos/workday-location.dto';
import { WorkdayLocationService } from '../services/workday-location.service';
export declare class WorkdayLocationController {
    private workdayLocationService;
    constructor(workdayLocationService: WorkdayLocationService);
    create(body: CreateWorkdayLocationDTO): Promise<WorkdayLocation>;
    getWorkdayLocations({ user }: {
        user: JwtUser;
    }): Promise<WorkdayLocation[]>;
}
