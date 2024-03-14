import { CanActivate, ExecutionContext } from '@nestjs/common';
import { WorkdayService } from 'src/workday/services/workday.service';
export declare class ActiveWorkdayGuard implements CanActivate {
    private workdayService;
    constructor(workdayService: WorkdayService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
