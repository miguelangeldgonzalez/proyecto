import { SetMetadata } from "@nestjs/common"; 
import { RoleNames } from "../entities/role.entity";

export const ROLES_KEY = 'roles';

export const Roles = (...roles: RoleNames[]) => SetMetadata(ROLES_KEY, roles);