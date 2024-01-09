import { Reflector } from '@nestjs/core';
import { RoleNames } from '../entities/role.entity';
import { ROLES_KEY } from '../decorators/role.decorator';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const roles = this.reflector.get<RoleNames[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isAuth = roles.some((role) => role === user.role.name);
    if (!isAuth) {
      throw new UnauthorizedException('your role is wrong');
    }
    return isAuth;
  }
}
