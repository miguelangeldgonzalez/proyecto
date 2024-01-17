import { JwtUser } from 'src/auth/guards/jwt-auth.guard';
import { CreateWorkdayDTO } from '../dtos/workday.dto';
import { WorkdayService } from '../services/workday.service';
export declare class WorkdayController {
    private workdayService;
    constructor(workdayService: WorkdayService);
    create(body: CreateWorkdayDTO): Promise<import("../entities/workday.entity").Workday>;
    getWorkdays({ user }: {
        user: JwtUser;
    }): Promise<import("../entities/workday.entity").Workday[]>;
}
