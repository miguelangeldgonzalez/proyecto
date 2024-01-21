import { 
  CanActivate, ExecutionContext, Injectable, 
  NotFoundException, UnauthorizedException 
} from '@nestjs/common';

// Auth
import { JwtUser } from './jwt-auth.guard';
import { RoleNames } from '../entities/role.entity';

// Services
import { ZoneService } from 'src/location/services/zone.service';
import { WorkdayService } from 'src/workday/services/workday.service';
import { WorkdayLocationService } from 'src/workday/services/workday-location.service';

import { Borough } from 'src/location/entities/borough.entity';

@Injectable()
export class ZoneGuard implements CanActivate {
  constructor (
    private workday: WorkdayService,
    private zoneService: ZoneService,
    private workdayLocationService: WorkdayLocationService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { user, body: data }: { user: JwtUser, body } 
      = context.switchToHttp().getRequest();

    const workdayIdByParam = context.switchToHttp().getRequest().params.workdayId;
    const workdayLocationIdByParam = context.switchToHttp().getRequest().params.workdayLocationId;

    let boroughId: number;

    // Este if valida de donde viene la informacion
    if (data?.workdayLocationId || workdayLocationIdByParam) { // Create Workday, Delete WorkdayLocation
      const location = await this.workdayLocationService.getById(data.workdayLocationId ?? workdayLocationIdByParam);
      boroughId = location.borough.id;

    } else if (data?.workdayId) { // Create Volunteer
      const location = await this.workdayLocationService.getByWorkdayId(data.workdayId);
      boroughId = location.borough.id;

    } else if (data?.boroughId) { // Create WorkdayLocation
      boroughId = data.boroughId;

    } else if (workdayIdByParam) { // Delete Workday
      const workday = await this.workday.getWorkdayById(workdayIdByParam);
      boroughId = workday.workdayLocation.borough.id;
    }

    if (boroughId) {
      return await this.validateBorough(boroughId, user);
    } else {
      return false;
    }
  }

  async validateBorough(boroughId: number, user: JwtUser): Promise<boolean> {
    let borough: Borough;

    switch (user.role.name) {
      case RoleNames.VOLUNTEER:
      case RoleNames.STATE_MANAGER:
        borough = await this.zoneService.validateBoroughInStates(boroughId, user.states.map(state => state.id));
        if (!borough) throw new UnauthorizedException('La parroquia no pertenece a ninguno de los estados del usuario');
        return true;

      case RoleNames.ADMIN:
        borough = await this.zoneService.findBoroughById(boroughId);
        if (!borough) throw new NotFoundException('No se encontró la parroquia');
        return true;

      default:
        return false;
    }
  }
}
