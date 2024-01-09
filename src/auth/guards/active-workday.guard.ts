import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { WorkdayService } from 'src/workday/services/workday.service';
import { RoleNames } from '../entities/role.entity';

@Injectable()
export class ActiveWorkdayGuard implements CanActivate {
  constructor(
    private workdayService: WorkdayService,
  ) {}
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { body, user } = context.switchToHttp().getRequest();
    if (user.role.name == RoleNames.ADMIN) return true;

    if (!body.workdayId) return false;

    const workday = await this.workdayService.checkActiveWorkday(body.workdayId);
    if (workday) return true;
    else return false;
  }
}
