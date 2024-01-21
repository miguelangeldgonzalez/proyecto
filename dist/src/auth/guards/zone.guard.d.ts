import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtUser } from './jwt-auth.guard';
import { ZoneService } from 'src/location/services/zone.service';
import { WorkdayService } from 'src/workday/services/workday.service';
import { WorkdayLocationService } from 'src/workday/services/workday-location.service';
export declare class ZoneGuard implements CanActivate {
    private workday;
    private zoneService;
    private workdayLocationService;
    constructor(workday: WorkdayService, zoneService: ZoneService, workdayLocationService: WorkdayLocationService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    validateBorough(boroughId: number, user: JwtUser): Promise<boolean>;
}
