import { CreateWorkdayDTO } from '../dtos/workday.dto';
import { WorkdayService } from '../services/workday.service';
export declare class WorkdayController {
    private workdayService;
    constructor(workdayService: WorkdayService);
    create(body: CreateWorkdayDTO): Promise<import("../entities/workday.entity").Workday>;
}
